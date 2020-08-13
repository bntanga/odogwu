const mongoose = require("mongoose");

const PDFBookSchema= new mongoose.Schema({
  title: { type: String, default: "" },
  author: { type: String, default: "" },
  subject:{type:String,default:""},
  format: { type: "", default: "PDF" },
  description: { type: "", default: "" },
  dateUploaded: { type: Date, default: Date.now()},
  imageUrl: { type: String, default: "" },
  downloadUrl:{type:String,default:" "},
  publicationDate: { type: String, default: "" },
 
});

// compile model from schema
module.exports = mongoose.model("pdfBook", PDFBookSchema);