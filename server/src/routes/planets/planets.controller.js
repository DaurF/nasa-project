const planets = require("../../models/planets.model");

function getAllPlanets(req, res) {
  return res.status(200).json({
    status: "success",
    results: planets.length,
    data: {
      planets,
    },
  });
}

module.exports = {
  getAllPlanets,
};
