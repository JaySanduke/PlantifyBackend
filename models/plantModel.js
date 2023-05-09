const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  plantId: {
    type: mongoose.Schema.Types.ObjectId,
    default: function () {
      return this._id.toString();
    },
    required: true
  },
  name: {
    type: String,
    required: true
  },
  scientificName: {
    type: String,
    required: true
  },
  pollutantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pollutant",
    required: true
  }
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
