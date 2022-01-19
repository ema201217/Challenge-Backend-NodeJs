const router = require("express").Router();

// Middleware Validations
const characterCreateValidation = require("../validations/characterCreateValidation");
const characterUpdateValidation = require("../validations/characterUpdateValidation");

// Middleware required
const checkToken = require("../middlewares/checkToken"); // Chequea si es correcta la verificación del TOKEN para permitir acceso en las rutas definidas abajo
const checkParams = require("../middlewares/checkParams"); // Chequea si es valido el req.params.id y si esa informacion existe en nuestra base de datos

// Character Controller
const {
  listAndQueries,
  detail,
  create,
  update,
  remove,
} = require("../controllers/charactersController");

// charactersAll
router.get("/characters", checkToken, listAndQueries);
router.get("/character/:id", checkToken, checkParams, detail);

// characterCreate
router.post("/character/create", checkToken, characterCreateValidation, create);

// characterUpdate
router.put(
  "/character/update/:id",
  checkToken,
  checkParams,
  characterUpdateValidation,
  update
);

// characterDelete
router.delete("/character/delete/:id", checkToken, checkParams, remove);

module.exports = router;
