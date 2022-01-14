const { body } = require("express-validator");
const { compare } = require("bcrypt");
const db = require("../database/models");

module.exports = [
  body("name")
    .notEmpty()
    .withMessage('"Name" cannot be empty')
    .bail()
    .isLength({ min: 4 })
    .withMessage('"Name" must be less than 4 characters')
    .bail()
    .custom(async value=>{
      const character = await  db.Character.findOne({where:{name:value}})
      return character && Promise.reject('Name already exists')
    }),

  body("age").isNumeric().withMessage('"Age" must be numeric'),

  body("history")
    .notEmpty()
    .withMessage('"History" cannot be empty')
    .isString()
    .withMessage('"History" must be a text string'),

    body('image')
    .isString()
    .withMessage('"Image" must be a text string').bail()
    .matches(/http/)
    .withMessage('"Image" value must contain "http"'),

    body('weight')
    .isNumeric()
    .withMessage('"Weight" must be a number')
];
