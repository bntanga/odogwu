const mongoose = require("mongoose");

const HardCoverBookSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  author: { type: Array, default: [] },
  subject: { type: String, default: "" },
  description: { type: String, default: "" },
  edition: { type: Number, default: 1 },
  gradeLevel: { type: String, default: "" },
  dateUploaded: { type: Date, default: Date.now() },
  publicationDate: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  price: { type: String, default: "" },
  sellerLocation: { type: String, default: "" },
  sellerPhoneNumber: { type: String, default: "" },
  sellerEmail: { type: String, default: "" },
  sellerId: { type: String, default: "" },
});

// compile model from schema
module.exports = mongoose.model("hardCoverBook", HardCoverBookSchema);
