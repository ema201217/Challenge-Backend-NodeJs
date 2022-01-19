const router = require("express").Router();

//Validations
const createValidation = require("../validations/moviesCreateValidation");
const updateValidation = require("../validations/moviesUpdateValidation");

//Middleware required
const checkParams = require("../middlewares/checkParams");
const checkToken = require("../middlewares/checkToken");

//Controller User
const {
  listAndQueries,
  detail,
  create,
  update,
  remove,
} = require("../controllers/moviesController");

// List and Queries
router.get("/movies/", checkToken, listAndQueries);

// Detail
router.get("/movie/:id", checkToken, checkParams, detail);

// Create
router.post("/movie/create",checkToken, createValidation, create);

// Update
router.put("/movie/update/:id", checkToken,updateValidation,checkParams,  update);

// Delete
router.delete("/movie/delete/:id", checkToken, checkParams, remove);

module.exports = router;
