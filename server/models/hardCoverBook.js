const mongoose = require("mongoose");

const HardCoverBookSchema = new mongoose.Schema({
  title:{ type: String, default: "" },
  author: { type: String, default: "" },
  subject:{type:String,default:""},
  format: { type: String, default: "Physical" },
  description: { type: String, default: "" },
  dateUploaded: { type: Date, default: Date.now()},
  imageUrl: { type: String, default: "" },
  publicationDate: { type: String, default: "" },
  price: { type: String, default: "" },
  sellerLocation: { type: String, default: "" },
  sellerPhoneNumber: { type: String, default: "" },
  sellerEmail: { type: String, default: "" },
  sellerId: { type: String, default: "" },
});

// compile model from schema
module.exports = mongoose.model("hardCoverBook", HardCoverBookSchema);
