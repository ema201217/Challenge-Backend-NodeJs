const getUrl = (req) => {
  return `${req.protocol}://${req.get("host")}${req.originalUrl}`;
};

module.exports = {
  login: (req, res) => {
    res.status(200).json({
      meta: {
        endpoint: getUrl(req),
        status: 200,
        total: 20,
      },
      data: 1,
    });
  },
  register: (req, res) => {
    res.status(200).json({
      meta: {
        endpoint: getUrl(req),
        status: 200,
        total: 20,
      },
      data: 1,
    });
  },
};
