const express = require("express");
const app = express();

const planetsRouter = require("./routes/planets/planets.router");

// Middlewares
app.use(express.json());

// Routers
app.use("/planets", planetsRouter);

module.exports = app;
