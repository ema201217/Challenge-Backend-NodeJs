const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const db = require("../database/models");

const getUrl = (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
};

module.exports = {
  listAndQueries: async (req, res) => {
    const { name = null, genre = null, order = null } = req.query;
    let data = [];

    try {
      if (!name && !genre && !order) {
        // Si no existe ningun query si lista todas las peliculas o series
        const moviesSeries = await db.Movie.findAll();

        moviesSeries.forEach(({ image, title, release_date }) => {
          data.push({ image, title, release_date }); // Coloco en data cada pelicula con las tres propiedades (image,title y release_date)
        });

        return res.status(200).json({
          meta: {
            endpoint: getUrl(req),
            status: 200,
            total: data.length,
          },
          data,
        });
      }

      if (order) {
        // Si existe el query order
        if (order.toUpperCase() != "ASC" && order.toUpperCase() != "DESC") {
          // Si los valores son distintos de los que son validos
          throw { msg: '"Order" invalid value', valid: "ASC,DESC" }; // Manejamos el error con throw creando un objeto con dos propiedades
        } else {
          data = await db.Movie.findAll({
            // Si el valor de la query es valido a data le damos el valor de lo que hay en la base de dato ordenada como corresponda
            order: [["title", order.toUpperCase()]],
            include: ["characters", "genre"],
          });
        }
      }

      if (name) {
        // Si existe el query name
        data = await db.Movie.findAll({
          // Colocamos en data lo que nos devuelve la consulta a la base de datos
          where: {
            title: {
              [Op.like]: `%${name}%`,
            },
          },
          include: ["characters", "genre"],
        });
        if (data.length === 0) throw '"Name" does not exist'; // Si la consulta realizada no nos devuelve ninguna información creamos un error con throw para luego recibirlo en el catch
      }

      if (genre) {
        // Si existe la query genre
        if (isNaN(genre)) {
          // Si el valor de la query no es un numero
          throw '"Genre query" has to be a numeric value'; // Creamos un error
        } else {
          data = await db.Movie.findAll({
            // Colocamos en data lo que nos devuelve la consulta a nuestra base de datos
            where: { genre_id: genre },
            include: ["characters", "genre"],
          });
          if (data.length === 0) throw '"Genre" does not exist'; // Si la consulta realizada no nos devuelve ninguna información creamos un error con throw para luego recibirlo en el catch
        }
      }

      if (name && order) {
        //  Si existen las queries name y order
        data = await db.Movie.findAll({
          // Colocamos en data lo que nos devuelve la consulta con el where y order solicitados dentro del metodo "findAll"
          where: {
            title: {
              [Op.like]: `%${name}%`,
            },
          },
          order: [["title", order.toUpperCase()]],
          include: ["characters", "genre"],
        });
        if (data.length === 0) throw '"Name" does not exist'; // Si no existe ninguna información creamos un error
      }

      if (genre && order) {
        // Si existen las queries genre y order
        data = await db.Movie.findAll({
          // Colocamos en data la información que nos devuelve la consulta con el where y order solicitado dentro del metodo "findAll"
          where: { genre_id: genre },
          order: [["title", order.toUpperCase()]],
          include: ["characters", "genre"],
        });
        if (data.length === 0) throw '"Genre" does not exist'; // Si no existe ninguna información creamos un error
      }

      if (name && genre && order) {
        //  Si existen las queries name,genre y order
        data = await db.Movie.findAll({
          // Colocamos en data lo que nos devuelve la consulta con el where y order solicitados dentro del metodo "findAll"
          where: {
            [Op.and]: [
              {
                title: {
                  [Op.like]: `%${name}%`,
                },
              },
              { genre_id: genre },
            ],
          },
          order: [["title", order.toUpperCase()]],
          include: ["characters", "genre"],
        });
        /* console.log(data); */
        if (data.length === 0) throw '["Name" | "Genre"] does not exist'; // Si no existe ninguna información creamos un error
      }

      return res.status(200).json({
        meta: {
          endpoint: getUrl(req),
          status: 200,
          total: data.length,
        },
        data,
      });
    } catch (error) {
      // Recibimos todos los errores que existan y lo mandamos como respuesta.
      res.status(404).json({
        status: 404,
        error,
      });
    }
  },
  detail: async (req, res) => {
    const id = req.params.id;
    const movieExist = await db.Movie.findByPk(id, {
      include: ["characters", "genre"],
    });

    try {
      res.status(200).json({
        meta: {
          endpoint: getUrl(req),
          status: 200,
        },
        data: movieExist,
      });
    } catch (error) {
      res.status(404).json({
        error,
        status: 404,
      });
    }
  },
  create: async (req, res) => {
    const { image, title, release_date, qualify, genre_id } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({
        meta: {
          endpoint: getUrl(req),
          status: 404,
          ok: false,
        },
        errors: errors.mapped(),
      });
    }

    const movie = await db.Movie.create({
      image,
      title,
      release_date,
      qualify,
      genre_id,
    });

    return res.status(200).json({
      meta: {
        endpoint: getUrl(req),
        status: 200,
        ok: true,
      },
      data: movie,
    });
  },
  update: async (req, res) => {
    const { image, title, release_date, qualify, genre_id } = req.body;
    const errors = validationResult(req);
    const id = req.params.id;

    if (!errors.isEmpty()) {
      return res.status(404).json({
        meta: {
          endpoint: getUrl(req),
          status: 404,
          ok: false,
        },
        errors: errors.mapped(),
      });
    }
    const stateBefore = await db.Movie.findByPk(id);

    await db.Movie.update(
      {
        title,
        release_date,
        qualify,
        genre_id,
        image: image || stateBefore.image,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(201).json({
      //
      meta: {
        endpoint: getUrl(req),
        status: 201,
        ok: true,
      },
      data: {
        update: await db.Movie.findByPk(id),
        before: stateBefore,
      },
    });
  },
  remove: async (req, res) => {
    const id = req.params.id;
    try {
      const before = await db.Movie.findByPk(id);
      await db.Movie.destroy({ where: { id } });

      return res.status(200).json({
        meta: {
          status: 200,
          del: true,
        },
        before,
      });
    } catch (error) {
      res.status(404).json({
        meta: {
          del: false,
          msg: error,
        },
      });
    }
  },
};
