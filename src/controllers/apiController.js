const db = require("../database/models");

const getUrl = (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
};

module.exports = {
  list: async (req, res) => {
    try {

      const data = await db.Movie.findAll();

      let arrCharacters = [];

      data.forEach(({ image, title }) => {
        arrCharacters.push({ image, title });
      });
      res.status(200).json({
          
        meta: {
          endpoint: getUrl(req),
          status: 200,
          total: arrCharacters.length,
        },
        data: arrCharacters

      });
    } catch (error) {

      throw {
        message: error,
        status: 500,
      };

    }

  },
};
