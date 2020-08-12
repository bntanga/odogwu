const mongoose = require("mongoose");

const HardCoverBookSchema = new mongoose.Schema({
  title: String,
  isbn: { type: String, default: "" },
  author: { type: String, default: "" },
  format: { type: "", default: "" },
  publicationStatus: { type: "", default: "" },
  bisacSubject: { type: "", default: "" },
  description: { type: "", default: "" },
  dateUploaded: String,
  imageUrl: { type: String, default: "" },
  publicationDate: { type: String, default: "" },
  price: String,
  sellerLocation: String,
  sellerPhoneNumber: String,
  sellerEmail: { type: String, default: "" },
  sellerId: { type: String, default: "" },
});

// compile model from schema
module.exports = mongoose.model("hardCoverBook", HardCoverBookSchema);
