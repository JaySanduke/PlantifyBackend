// Model imports
const Pollutant = require("../models/pollutantModel");

// Controller functions
exports.createPollutant = async (request, response) => {
  try {
    // Get the pollutant data from the request body
    const { pollutantName, qualitativeData } = request.body;

    // Create a new pollutant document with the provided data
    const pollutant = await Pollutant.create({
      name: pollutantName,
      qualitativeData
    });

    // Send the created pollutant document as the response
    response.status(201).json({
      status: "success",
      data: {
        pollutant
      }
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    console.error(error);
    response.status(400).json({
      status: "fail",
      message: "Error in creating pollutants: " + error.message
    });
  }
};

exports.createMultiplePollutants = async (request, response) => {
  try {
    // Get the pollutant data array from the request body
    const { pollutantData } = request.body;

    // Create an array to hold the new pollutant documents
    const pollutants = [];

    for (let i = 0; i < pollutantData.length; i++) {
      // Get the pollutant data from the request body
      const { pollutantName, qualitativeData } = pollutantData[i];

      // Create a new pollutant document with the provided data
      const pollutant = await Pollutant.create({
        name: pollutantName,
        qualitativeData
      });
      pollutants.push(pollutant);
    }

    // Send the created pollutant document as the response
    response.status(201).json({
      status: "success",
      data: {
        pollutant_counts: pollutants.length,
        pollutants
      }
    });
  } catch (error) {
    // Handle any errors that occur during the creation process
    console.error(error);
    response.status(400).json({
      status: "fail",
      message: "Error in creating pollutants: " + error.message
    });
  }
};

exports.getPollutantByName = async (request, response) => {
  try {
    // Extract the pollutant name from the request parameters
    const { name } = request.params;

    // Find the pollutant document by its name
    const pollutant = await Pollutant.findOne({ name });

    // Check if a pollutant with the provided name exists
    if (!pollutant) {
      return response.status(404).json({ message: "Pollutant not found" });
    }

    // Send the retrieved pollutant document as the response
    response.status(200).json(pollutant);
  } catch (error) {
    // Handle any errors that occur during the get process
    console.error(error);
    response.status(400).json({
      status: "fail",
      message: "Error in fetching pollutant: " + error.message
    });
  }
};
