const router = require("express").Router();

//Middleware required
const checkParams = require("../middlewares/checkParams");

//Controller User
const { list, detail } = require("../controllers/moviesController");

router.get("/movies", list);
router.get("/movie/:id", checkParams, detail);

module.exports = router;
