const mongoose = require("mongoose");

const contactScheme = new mongoose.Schema({
  contactId: {
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
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const Contact = mongoose.model("Contact", contactScheme);

module.exports = Contact;
