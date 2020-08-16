const mongoose = require("mongoose");

const QuestionPaperSchema = new mongoose.Schema({

  paperBoard:  { type: String, default: "" },
  paperYear:  { type: Number, default: 1000},
  paperMonth: {type:String,default:""},
  paperNumber:{ type: Number, default: 1},
  subject: {type:String, default:""},
  downloadUrl: {type:String,default:""},
  gradeLevel: { type: String, default: "" },
  dateUploaded: { type: Date, default: Date.now()},
  format: { type: String, default: "PDF" },


});

// compile model from schema
module.exports = mongoose.model("QuestionPaper", QuestionPaperSchema);