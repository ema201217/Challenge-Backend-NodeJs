const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// ENRUTADORES
const apiRouter = require("./routes/apiRoute");
const authRouter = require("./routes/authRoute");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// RUTAS
app.use("/api", apiRouter);
app.use("/auth", authRouter);

/* SERVER*/
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
