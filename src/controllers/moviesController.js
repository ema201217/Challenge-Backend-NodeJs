const db = require("../database/models");

const getUrl = (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
};

module.exports = {
  list: async (req, res) => {
    try {
      const moviesSeries = await db.Movie.findAll();

      const arrMoviesSeries = [];

      moviesSeries.forEach(({ image, title, release_date }) => {
        arrMoviesSeries.push({ image, title, release_date });
      });

      res.status(200).json({
        meta: {
          endpoint: getUrl(req),
          status: 200,
          total: arrMoviesSeries.length,
        },
        data: arrMoviesSeries,
      });
    } catch (error) {
        res.status(404).json({
            status: 404,
            error,
          });
    }
  },
  detail: async (req, res) => {
    const id = req.params.id;
    const movieExist = await db.Movie.findByPk(id, {
      include: ["characters"],
    });

    try {
      res.status(200).json({
        meta: {
          endpoint: getUrl(req),
          status: 200,
        },
        data: movieExist,
      });
    } catch (error) {
      res.status(404).json({
        error,
        status: 404,
      });
    }
  },
};
