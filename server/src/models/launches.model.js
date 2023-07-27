const launchesModel = require("./launches.mongo");
const planets = require("./launches.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);
saveLaunch(launch);

async function existsLaunchWithId(launchId) {
  return await launchesModel.find({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesModel.findOne().sort("-flightNumber");
  return latestLaunch ? latestLaunch.flightNumber : DEFAULT_FLIGHT_NUMBER;
}

async function getAllLaunches() {
  return await launchesModel.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.find({ keplerName: launch.target });

  if (!planet) {
    throw new Error("No matching planet found!");
  }

  await launchesModel.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

// function addNewLaunch(launch) {
//   latestFlightNumber += 1;
//   return launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       success: true,
//       upcoming: true,
//       customers: ["ZTM", "NASA"],
//       flightNumber: latestFlightNumber,
//     })
//   );
// }

async function abortLaunchById(launchId) {
  const aborted = await launchesModel.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false }
  );

  return aborted.ok === 1 && aborted.nModified === 1;
  // const aborted = launches.get(launchId);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
