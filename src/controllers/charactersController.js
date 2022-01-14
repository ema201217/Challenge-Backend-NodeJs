const db = require("../database/models");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const getUrl = (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
};

module.exports = {
  
  list: async (req, res) => {
    try {
      const data = await db.Character.findAll(); // Obtengo todos los personajes de mi base de datos

      let arrCharacters = [];

      data.forEach(({ image, name }) => {
        arrCharacters.push({ image, name }); // Ingreso en el array creado un objeto con las propiedades especificas que nos trae nuestra base de datos
      });
      res.status(200).json({
        meta: {
          endpoint: getUrl(req),
          status: 200,
          total: arrCharacters.length,
        },
        data: arrCharacters,
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
      const characterExist = await db.Character.findByPk(id, {  // Busco en mi base de datos el personaje solicitado con el ID obtenido como parametro
        include: ["movies"], // asociación
      });

        try {
          res.status(200).json({
            meta: {
              endpoint: getUrl(req),
              status: 200,
            },
            data: characterExist,  // Enviamos el personaje encontrado
          });
        } catch (error) {
          res.status(404).json({
            error,
            status: 404,
          });
        }
  
  },
  search: async (req, res) => {
    const { name = null, age = null, movies = null } = req.query; // Al momento que destructuramos las tres propiedades no existen y por ese motivo le otorgamos un valor por defecto en NULL

    const charactersFind =  // Buscamos todos los personajes con las tres distintas queries especificadas (name,age,movies)
      (await db.Character.findAll({ 
        where: {
          [Op.or]: [  // Operador OR de Sequelize 
            {
              name: {
                [Op.like]: `%${name}%`,   // Operador like (permite la utilización de comodin (%) para que se obtenga una considencia menos especifica )
              },
            },
            {
              age, // Valor especifico a obtener
            },
          ],
        },
        include: ["movies"],
      })) || null; // Si no existe ningun personaje la variable recibe como valor NULL

    const moviesFind = (await db.Movie.findByPk(movies)) || null; // Al igual que el personaje si no existe la pelicula o serie recibe la variable el valor de NULL

    if (charactersFind || moviesFind) { 
      return res.status(200).json({
        meta: {
          endpoint: getUrl(req),
          status: 200,
        },
        movies: moviesFind,
        characters: charactersFind,
      });
    } else {
      return res.status(404).json({
        found: false,
        query: req.query,
        status: 404,
      });
    }
  },
  create: async (req, res) => {
    const { name, age, history, image, weight } = req.body; // Destructuración del body

    const errors = validationResult(req); // Obtenemos las validaciones del request 

    if (!errors.isEmpty()) {  // Si existen errores enviamos como respuesta los errores obtenidos de express validator
      return res.status(404).json({
        meta: {
          endpoint: getUrl(req),
          status: 404,
          ok: false,
        },
        errors: errors.mapped(),
      });
    }

    const character = await db.Character.create({ // Creamos el personaje
      name,
      age,
      history,
      image: /http/.test(image) // Si cuando creamos el personaje no colocamos ningun valor como image se coloca el STRING
        ? image
        : "https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg",
      weight,
    });

    return res.status(200).json({
      meta: {
        endpoint: getUrl(req),
        status: 200,
        ok: true,
      },
      data: character,  // Mandamos como respuesta el personaje creado entre otros datos mas (meta).
    });
  },
  update: async (req, res) => {
    const { name, age, history, image, weight } = req.body;
    const errors = validationResult(req);
    const id = +req.params.id;

        if (!errors.isEmpty()) {  // Si existen errores enviamos los errores como respuesta entre otros datos mas (meta)

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

        await db.Character.update(  // Actializamos los datos
          {
            name,
            age,
            history,
            image: /http/.test(image) ? image : stateBefore.image,  // Si no se cambia o se omite esta información recibe el valor que tenia antes
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
