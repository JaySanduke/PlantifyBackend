const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRouter = require("./router/apiRouter");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");
require("dotenv").config(
  {
    path: path.join(__dirname, ".env")
  }
);

// Initialize MongoDB connection
require("./db/mongoDB");

const app = express();
const port = 3000;

// Enable CORS
const corsoptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};

app.use(cors(corsoptions));

// create a rotating write stream
const accessLogStream = rfs.createStream("server.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs")
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
  res.send("Plantify server running successfully!");
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
