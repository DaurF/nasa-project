const express = require("express");
const app = express();
const cors = require("cors");

const planetsRouter = require("./routes/planets/planets.router");

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// Routers
app.use("/planets", planetsRouter);

module.exports = app;
