// Model imports
const Plant = require("../models/plantModel");

// Controller functions
exports.createPlant = async (request, response) => {
  try {
    // Get the plant data from the request body
    const { plantName, plantScientificName, pollutantId } = request.body;

    // Create a new plant document with the provided data
    const newPlant = await Plant.create({
      name: plantName,
      scientificName: plantScientificName,
      pollutantId
    });

    response.status(201).json({
      status: "success",
      data: {
        plant: newPlant
      }
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({
      status: "fail",
      message: "Error in creating plant: " + error.message
    });
  }
};

exports.createMultiplePlants = async (request, response) => {
  try {
    // Get the plant data array from the request body
    const { plantsData } = request.body;

    const updatedplantsdata = [];

    // eslint-disable-next-line prefer-const
    for await (let newpollutantplants of plantsData) {
      const { pollutantId, plantData } = newpollutantplants;

      // Create an array to hold the new plant documents
      const plants = [];

      // Loop through each plant data object and create a new plant document
      for (let i = 0; i < plantData.length; i++) {
        const { name, scientificName } = plantData[i];
        // Create a new plant document with the provided data
        const newPlant = await Plant.create({
          name,
          scientificName,
          pollutantId
        });
        await plants.push(newPlant);
      }

      await updatedplantsdata.push({
        pollutantId,
        count: plants.length,
        plants
      });
    }

    // Send the created plant documents as the response
    console.log("Multiple plants created successfully");
    response.status(201).json({
      status: "success",
      data: {
        counts: updatedplantsdata.length,
        updatedplantsdata
      }
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({
      status: "fail",
      message: "Error in creating plant: " + error.message
    });
  }
};

exports.getAllPlants = async (request, response) => {
  try {
    // Get all plant documents from the database
    const plants = await Plant.find();
    const plantsCount = await Plant.countDocuments();

    // Send the plant documents as the response
    console.log("All Plants: ", plants);
    response.status(200).json({
      status: "success",
      data: {
        count: plantsCount,
        plants
      }
    });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error(error);
    response.status(400).json({
      status: "fail",
      message: "Error in getting all plants: " + error.message
    });
  }
};

exports.getPlantsByPollutant = async (request, response) => {
  try {
    // Get the pollutant ID from the query parameters
    const { pollutantId } = request.query;
    console.log("Pollutant ID: ", pollutantId);

    // Get all plant documents from the database
    const plants = await Plant.find({ pollutantId });
    const plantsCount = await Plant.countDocuments({ pollutantId });

    // Send the plant documents as the response
    console.log(`All Plants with pollutant id: ${pollutantId} :- `, plants);
    response.status(200).json({
      status: "success",
      data: {
        count: plantsCount,
        plants
      }
    });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error(error);
    response.status(400).json({
      status: "fail",
      message: "Error in getting all plants: " + error.message
    });
  }
};
