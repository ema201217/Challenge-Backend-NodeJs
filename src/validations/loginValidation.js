const { body } = require("express-validator");
const { compare } = require("bcrypt");
const db = require("../database/models");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Email invalid")
    .bail()
    .custom(async (value) => {
      const email = await db.User.findOne({ where: { email: value } });
      return !email && Promise.reject("User not found");
    }),

  body("pass")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail()
    .custom(async (value, { req }) => {
      const { email } = req.body;
      const user = await db.User.findOne({ where: { email } });

      if (user) {
        const passwordTrue = await compare(value, user.pass);
        return !passwordTrue && Promise.reject("Incorrect password");
      }
    })
];
