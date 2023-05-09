const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("API router working");
});

// Controller imports
const { createPollutant, getPollutantByName, createMultiplePollutants } = require("../controllers/pollutantController");
const { createPlant, getAllPlants, createMultiplePlants, getPlantsByPollutant } = require("../controllers/plantController");
const { getPollutionAndPlantsData } = require("../controllers/dataApiController");

// Pollutant routes
router.post("/createpollutant", createPollutant);
router.post("/createmultiplepollutant", createMultiplePollutants);
router.get("/getpollutant", getPollutantByName);

// Plant routes
router.post("/createplant", createPlant);
router.post("/createmultipleplant", createMultiplePlants);
router.get("/getallplants", getAllPlants);
router.get("/getplantsbypollutant", getPlantsByPollutant);

// API routes
router.post("/getplantsandpollutiondata", getPollutionAndPlantsData);

// Export the router
module.exports = router;
