const db = require("../database/models");
const bc = require("bcrypt");
const tk = require("jsonwebtoken");
const { transporter } = require("../services/sendEmail");
const { validationResult } = require("express-validator");

const getUrl = (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
};

module.exports = {
  login: async (req, res) => {
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

    // Buscamos el usuario en nuestra base de datos
    const user = await db.User.findOne({ where: { email: req.body.email } });

    // Creamos el token si esta todo bien indicando como primer parámetro un objeto con información del usuario y segundo parametro el TOKEN SECRETO
    const token = await tk.sign(
      { user: user.email, id: user.id },
      process.env.TOKEN_SECRET
    );

    // Enviamos por la cabecera la key = auth-token y el token creado
    // Luego tambien enviamos como respuesta un json con las propiedades indicadas abajo.
    return res.header("auth-token", token).json({
      error: null,
      ok: true,
      data: { token },
    });
  },

  register: async (req, res) => {
    try {
      
      const { email, pass } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(404).json({
          meta: {
            endpoint: getUrl(req),
            status: 404,
            ok: false,
          },
          errors: errors.mapped(),
        });
      } else {
        // Si no existe el usuario lo creamos en nuestra base de datos
        const user = await db.User.create({
          email,
          pass: bc.hashSync(pass, 10), // Guardamos hasheada la contraseña que recibimos por el body
        });

        // Enviamos como respuesta un json con la información indicado abajo
        res.status(200).json({
          meta: {
            endpoint: getUrl(req),
            status: 200,
            ok: true,
            msg: "User created",
          },
          data: user,
        });

        await transporter.sendMail({
          from: "<ema201217@gmail.com>",
          to: email,
          subject: "Registración exitosa",
          html: `
          <div>
            <h1>Bienvenido a la API de Disney</h1>
          </div>
          <img src='https://www.curralia.es/wp-content/uploads/2021/02/Disney-foto.jpg' alt='Disney'>
          `,
        });
      }
    } catch (error) {
      console.log(`%c ${error}`, "background: #222; color: #bada55");
    }
  },
};
