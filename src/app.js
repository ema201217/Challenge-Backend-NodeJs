require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors")

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

// ENRUTADORES
const charactersRouter = require("./routes/charactersRoutes");
const moviesRouter = require("./routes/moviesRoutes");
const authRouter = require("./routes/authRoute");

// RUTAS
app.use("/auth", authRouter);
app.use("/api", charactersRouter);
app.use("/api", moviesRouter);

// Not found - 404
app.use("/*", (req, res) => {
  res.status(404).json({ 
    status:404,
    error: "Not found"
  });
});
// ----------------------------------------------------------------

/* SERVER*/
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
