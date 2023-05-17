const axios = require("axios");

async function forwardGeoCoding (url) {
  const GeocodeResponse = await axios.request({
    method: "GET",
    url
  }).then(function (response) {
    return response.data;
  });

  return GeocodeResponse;
};

module.exports = { forwardGeoCoding };
