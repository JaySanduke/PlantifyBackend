// Model imports
const Plant = require("../models/plantModel");
const Pollutant = require("../models/pollutantModel");

// Service imports
const { GetPollutionData } = require("../services/openWeatherApiService");

// Controller functions
exports.getPollutionAndPlantsData = async (request, response) => {
  try {
    // Get the location from the request body
    const { lat, lon } = request.query;
    console.log(request.query);

    // Get the pollutant data from the OpenWeather API
    const pollutantData = await GetPollutionData(lat, lon);
    console.log(pollutantData);

    function airqualityindex (aqi) {
      const indexes = new Map([
        [1, "Good"],
        [2, "Fair"],
        [3, "Moderate"],
        [4, "Poor"],
        [5, "Very Poor"]
      ]);

      return {
        value: aqi,
        quality: indexes.get(aqi)
      };
    }

    const aqi = await airqualityindex(pollutantData.list[0].main.aqi);
    console.log(aqi);
    // eslint-disable-next-line camelcase, no-unused-vars
    const { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = pollutantData.list[0].components;
    console.log(so2, no2, pm10, pm2_5, o3, co);

    async function getpollutantandplants (component, value) {
      const pollutant = await Pollutant.findOne({ name: component });

      if (!pollutant) {
        throw new Error(`Pollutant with name ${component} not found.`);
      }
      console.log(pollutant);

      const qualitativeData = pollutant.qualitativeData.find(data => {
        return data.range.min <= value && value <= data.range.max;
      });

      if (!qualitativeData) {
        throw new Error(`No qualitative data found for ${component} in pollutant ${pollutant.name}.`);
      }

      const quality = qualitativeData.quality;

      const returndata = {
        pollutantId: pollutant._id,
        pollutantName: pollutant.name,
        quality
      };

      // eslint-disable-next-line eqeqeq
      if (quality == "Moderate" || quality == "Poor" || quality == "Very Poor") {
        const plants = await Plant.find({ pollutantId: pollutant.pollutantId });
        const counts = await Plant.countDocuments({ pollutantId: pollutant.pollutantId });
        returndata.counts = counts;
        returndata.plants = plants;
      }

      return returndata;
    }

    const pollutantandplants = await Promise.all([
      getpollutantandplants("SO2", so2),
      getpollutantandplants("NO2", no2),
      getpollutantandplants("PM10", pm10),
      getpollutantandplants("PM2.5", pm2_5),
      getpollutantandplants("O3", o3),
      getpollutantandplants("CO", co)
    ]);

    await console.log(pollutantandplants);

    response.status(200).json({
      status: "success",
      data: {
        pollutantandplants
      }
    });
  } catch (error) {
    console.error(error);
    response.status(401).json({
      status: "fail",
      message: "Error in creating plant: " + error
    });
  }
};
