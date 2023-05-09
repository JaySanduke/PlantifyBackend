const axios = require("axios");

async function GetPollutionData (lat, lon) {
  const pollutiondata = await axios.request({
    method: "GET",
    url: `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  }).then(function (response) {
    return response.data;
  });

  return pollutiondata;
};

module.exports = { GetPollutionData };
