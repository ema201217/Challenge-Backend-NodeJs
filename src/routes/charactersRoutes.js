const router = require("express").Router();

// Middleware Validations
const characterCreateValidation = require("../validations/characterCreateValidation");
const characterUpdateValidation = require("../validations/characterUpdateValidation");

// Middleware required
const checkToken = require("../middlewares/checkToken"); // Chequea si es correcta la verificación del TOKEN para permitir acceso en las rutas definidas abajo
const checkParams = require("../middlewares/checkParams"); // Chequea si es valido el req.params.id y si esa informacion existe en nuestra base de datos

// Character Controller
const {
  list,
  detail,
  create,
  update,
  remove,
  search,
} = require("../controllers/charactersController");

// charactersAll
router.get("/characters", list);
router.get("/character/:id", checkParams, detail);

// Querys
router.get("/characters", search);

// characterCreate
router.post("/character/create", characterCreateValidation, checkToken, create);

// characterUpdate
router.put(
  "/character/update/:id",
  checkParams,
  characterUpdateValidation,
  checkToken,
  update
);

// characterDelete
router.delete("/character/delete/:id", checkParams, checkToken, remove);

module.exports = router;
