const router = require("express").Router();

//Controller Api
const { login, register } = require("../controllers/authController");

router.get("/login", login);
router.post("/register", register);

module.exports = router;
