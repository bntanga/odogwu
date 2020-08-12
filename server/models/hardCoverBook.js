const mongoose = require("mongoose");

const HardCoverBookSchema = new mongoose.Schema({
  name: String,
  dateUploaded: String,
  imageUrl: {type: String, default: ""},
  price: String,
  sellerLocation: String,
  sellerPhoneNumber: String,
  sellerEmail: {type: String, default: ""},
  sellerId: {type: String, default: ""}


});

// compile model from schema
module.exports = mongoose.model("hardCoverBook", HardCoverBookSchema);
