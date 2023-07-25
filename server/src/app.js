const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Routers
app.use("/planets", planetsRouter);
app.get("/", (req, res) => {
  res.send(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
