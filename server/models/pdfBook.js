const mongoose = require("mongoose");

const PDFBookSchema= new mongoose.Schema({
  title: { type: String, default: "" },
  author: { type: Array, default: []},
  subject:{type:String,default:""},
  format: { type: String, default: "PDF" },
  description: { type: String, default: "" },
  edition:{type:Number,default:1},
  gradeLevel:{type:String,default:""},
  dateUploaded: { type: Date, default: Date.now()},
  downloadUrl:{type:String,default:" "},
  publicationDate: { type: String, default: "" },
 
});

// compile model from schema
module.exports = mongoose.model("pdf", PDFBookSchema);

