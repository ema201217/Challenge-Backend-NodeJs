const db = require("../database/models");

module.exports = async (req, res, next) => {
  const id = req.params.id;
  const characterExist = await db.Character.findByPk(id);
  const movieExist = await db.Movie.findByPk(id);
  if (!isNaN(id)) {
    if (characterExist || movieExist) {
      next();
    } else {
      res.status(404).json({
        status: 404,
        error: "What you are looking for does not exist",
      });
    }
  } else {
    res.status(404).json({
      status: 404,
      error: "Wrong IP address",
    });
  }
};
