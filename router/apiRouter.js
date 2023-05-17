const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("API router working");
});

// Controller imports
const { createPollutant, getPollutantByName, createMultiplePollutants } = require("../controllers/pollutantController");
const { createPlant, getAllPlants, createMultiplePlants, getPlantsByPollutant } = require("../controllers/plantController");
const { getPollutionAndPlantsData } = require("../controllers/dataApiController");
const { getForwardGeocode } = require("../controllers/geocodeController");

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
router.get("/getplantsandpollutiondata", getPollutionAndPlantsData);

router.post("/geocode/forward", getForwardGeocode);

// Export the router
module.exports = router;
