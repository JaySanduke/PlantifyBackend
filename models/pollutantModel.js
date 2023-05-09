const mongoose = require("mongoose");

const qualitativeDataSchema = new mongoose.Schema({
  quality: {
    type: String,
    required: true
  },
  range: {
    type: {
      min: {
        type: Number,
        min: 0,
        required: true
      },
      max: {
        type: Number,
        min: 0,
        required: true
      }
    },
    required: true
  }
});

const pollutantSchema = new mongoose.Schema({
  pollutantId: {
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
  qualitativeData: {
    type: [qualitativeDataSchema],
    required: true
  }
});

const Pollutant = mongoose.model("Pollutant", pollutantSchema);

module.exports = Pollutant;
