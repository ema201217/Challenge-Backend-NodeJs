const router = require("express").Router();

// Middleware Validation
const registerValidation = require("../validations/registerValidation");
const loginValidation = require("../validations/loginValidation");

//Controller User
const { login, register } = require("../controllers/authController");

router.post("/login", loginValidation, login);

router.post("/register", registerValidation, register);

module.exports = router;
