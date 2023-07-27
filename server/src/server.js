const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:7diyhapSodUfJJ5J@cluster0.fd5uwul.mongodb.net/nasa?retryWrites=true&w=majority";

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", err => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
}

startServer();
