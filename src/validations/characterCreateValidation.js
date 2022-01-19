const { body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  body("name")
    .notEmpty()
    .withMessage('"Name" cannot be empty')
    .bail()
    .isLength({ min: 4 })
    .withMessage('"Name" must have more than 3 characters')
    .bail()
    .custom(async (value) => {
      const character = await db.Character.findOne({ where: { name: value } });
      return character && Promise.reject("Name already exists");
    }),

  body("age")
    .optional({ nullable: true })
    .default(0)
    .isNumeric()
    .withMessage('"Age" must be numeric'),

  body("history")
    .optional({ nullable: true })
    .isString()
    .withMessage('"History" must be a text string'),

  body("image")
    .optional({ nullable: true })
    .default("https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg")
    .isString()
    .withMessage('"Image" must be a text string')
    .bail()
    .matches(/^(ftp|http|https):\/\/[^ "]+$/)
    .withMessage('"Image" must be a valid url'),

  body("weight")
    .optional({ nullable: true })
    .isNumeric()
    .withMessage('"Weight" must be a number'),
];
