const { body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Email invalid").bail()
    .custom(async (value) => {
      const email = await db.User.findOne({ where: { email: value } });
      return email && Promise.reject("Email already exists");
    }),
  body("pass")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail()
    .isString()
    .withMessage("Password must be a text string")
    .isLength({ min: 6 })
    .withMessage("Password must be less than 6 characters"),
];
