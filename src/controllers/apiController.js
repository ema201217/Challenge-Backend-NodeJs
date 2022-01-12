const db = require('../database/models')

const getUrl = (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
};

module.exports = {
  list: async (req, res) => {
      try {
        let data =  await db.Movie.findAll({
            include: ['genre']
        });
         res.status(200).json({
           meta: {
             endpoint: getUrl(req),
             status: 200,
             total: data.length,
           },
           data,
         });
          
      } catch (error) {
          throw {
              message: error,
              status: 500
          }
      }
  },
};
