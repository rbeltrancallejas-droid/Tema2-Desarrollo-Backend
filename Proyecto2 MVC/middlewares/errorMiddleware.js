const errorMiddleware = (err, req, res, next) => {

  console.error("ERROR:", err.message);

  res.status(500).json({
    error: "Internal server error"
  });

};

module.exports = errorMiddleware;