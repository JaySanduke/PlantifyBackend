// Utility imports
const { forwardGeoCoding } = require("../util/geocodeUtility");

// Controller Functions
exports.getForwardGeocode = async (request, response) => {
  try {
    const { webaddress } = request.body;

    // const geocode = await forwardGeoCoding(webaddress);

    response.status(200).json({
      status: "success",
      data: webaddress
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({
      status: "fail",
      message: "Error in getting geocode: " + error.message
    });
  }
};
