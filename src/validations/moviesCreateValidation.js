const { body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  body("title")
    .notEmpty()
    .withMessage('"Title" cannot be empty')
    .isString()
    .withMessage('"Title" must be a string')
    .bail()
    .isLength({ min: 4 })
    .withMessage('"Title" must have more than 3 characters')
    .bail()
    .custom(async (value) => {
      const movie = await db.Movie.findOne({ where: { title: value } });
      return movie && Promise.reject("Title already exists");
    }),

  body("image")
    .optional({ nullable: true })
    .default("https://tentulogo.com/wp-content/uploads/2017/09/disney-logo.jpg")
    .isString()
    .withMessage('"Image" must be a string')
    .bail()
    .matches(/^(ftp|http|https):\/\/[^ "]+$/)
    .withMessage('"Image" must be a valid url'),

  body("release_date")
    .optional({ nullable: true })
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage('"Release Date" is an invalid date (format valid YYYY-MM-DD)'),

  body("qualify")
    .optional({ nullable: true }) // Puede estar nullo al momento que se obtiene el request
    .isNumeric()
    .withMessage('"Quealify" must be a number')
    .bail()
    .isIn([1, 2, 3, 4, 5]) // Debe contener estos valores sino envia el error
    .withMessage('"Quealify" must be between 1 and 5'),

  body("genre_id")
    .notEmpty()
    .withMessage('"Genre Id" cannot be empty')
    .isNumeric()
    .withMessage('"Genre Id" must be a number')
    .custom(async (value) => {
      const genre = await db.Genre.findByPk(value);
      return !genre && Promise.reject('"Genre Id" does not exist');
    }),
];
