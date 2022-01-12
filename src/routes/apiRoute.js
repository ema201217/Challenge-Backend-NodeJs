const router = require("express").Router();

//Controller Api
const { list } = require("../controllers/apiController");

router.get("/characters", list);

module.exports = router;
