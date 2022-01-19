const db = require("../database/models");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const getUrl = (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
};

module.exports = {
  listAndQueries: async (req, res) => {
    try {
      const { name = null, age = null, movies = null } = req.query;
      let data = [];

      if (!name && !age && !movies) {
        // Si no existe ninguna query
        data = await db.Character.findAll(); // Obtenemos todos los personajes de mi base de datos

        let arr = [];

        data.forEach(({ image, name }) => {
          // arr.push({ image, name }); // Ingreso en el array creado un objeto con las propiedades especificas que nos trae nuestra base de datos
          arr = [...arr, ...[{ image, name }]]; // Otra manera de realizar la misma operación pero con spread operator
        });
        data = arr;

        res.status(200).json({
          meta: {
            endpoint: getUrl(req),
            status: 200,
            total: data.length,
          },
          data,
        });
      }

      if (name) {   // Si existe el query name
        data = await db.Character.findAll({  // Colocamos en data la información que recibimos de nuestra base de datos
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
        });
        if (data.length === 0) throw '"Name" does not exist';   // Si no existe nada en data creamos un error para recibirlo en el catch
      }

      if (age) { // Si existe el query age
        if (isNaN(age)) {   // Si age no es un numero creamos un error
          throw '"Age query" has to be a numeric value';
        } else {  // Si es un valor valido
          data = await db.Character.findAll({  // Colocamos en data la información obtenida con el where solicitado en el metodo "findAll"
            where: { age },
            include: ["movies"],
          });
          if (data.length === 0) throw '"Age" does not exist';  // Si no existe ninguna información creamos un error
        }
      }

      if (movies) {   // Si existe el query movies
        if (isNaN(movies)) {    // Si el valor no es un numero creamos un error
          throw '"Movies query" has to be a numeric value';
        } else {  // Si el valor es valido
          data = await db.Movie.findByPk(movies, { include: ["characters"] }); // Colocamos en data lo que nos devuelve la consulta a la base de datos
          if (!data) throw '"Movies" does not exist'; // Si no recibimos ninguna información creamos un error
        }
      }

      if (name && age) {  // Si existen las queries name y age
        data = await db.Character.findAll({   // Colocamos en data la consulta con el where solicitado en el metodo "findAll"
          where: {
            [Op.and]: [ // Operador AND de sequelize
              {
                age,
              },
              {
                name: {
                  [Op.like]: `%${name}%`,
                },
              },
            ],
          },
          include: ["movies"],  
        });
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
      res.status(404).json({
        status: 404,
        error,
      });
    }
  },
  detail: async (req, res) => {
    const id = req.params.id;
    const characterExist = await db.Character.findByPk(id, {
      // Busco en mi base de datos el personaje solicitado con el ID obtenido como parametro
      include: ["movies"], // asociación
    });

    try {
      res.status(200).json({
        meta: {
          endpoint: getUrl(req),
          status: 200,
        },
        data: characterExist, // Enviamos el personaje encontrado
      });
    } catch (error) {
      res.status(404).json({
        error,
        status: 404,
      });
    }
  },
  create: async (req, res) => {
    const { name, age, history, image, weight } = req.body; // Destructuración del body

    const errors = validationResult(req); // Obtenemos las validaciones del request

    if (!errors.isEmpty()) {
      // Si existen errores enviamos como respuesta los errores obtenidos de express validator
      return res.status(404).json({
        meta: {
          endpoint: getUrl(req),
          status: 404,
          ok: false,
        },
        errors: errors.mapped(),
      });
    }

    const character = await db.Character.create({
      // Creamos el personaje
      name,
      age,
      history,
      image,
      weight,
    });

    return res.status(200).json({
      meta: {
        endpoint: getUrl(req),
        status: 200,
        ok: true,
      },
      data: character, // Mandamos como respuesta el personaje creado entre otros datos mas (meta).
    });
  },
  update: async (req, res) => {
    const { name, age, history, image, weight } = req.body;
    const errors = validationResult(req);
    const id = +req.params.id;

    if (!errors.isEmpty()) {
      // Si existen errores enviamos los errores como respuesta entre otros datos mas (meta)

      return res.status(404).json({
        meta: {
          endpoint: getUrl(req),
          status: 404,
          ok: false,
        },
        errors: errors.mapped(),
      });
    }
    const stateBefore = await db.Character.findByPk(id); // Obtenemos el personaje antes de ser eliminado para enviarlo como información

    await db.Character.update(
      // Actializamos los datos
      {
        name,
        age,
        history,
        image: image || stateBefore.image, // Si no se cambia o se omite esta información recibe el valor que tenia antes
        weight,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(201).json({
      // Si esta todo ok! se envia la respuesta satifactoria con la información indicada abajo
      meta: {
        endpoint: getUrl(req),
        status: 201,
        ok: true,
      },
      data: {
        update: await db.Character.findByPk(id), // Obtenemos el personaje actualizado y lo enviamos
        before: stateBefore, // Enviamos el personaje en el estado anterior
      },
    });
  },
  remove: async (req, res) => {
    const id = req.params.id;
    try {
      const before = await db.Character.findByPk(id);
      await db.Character.destroy({ where: { id } });

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
