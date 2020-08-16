const mongoose = require("mongoose");

const YouTubeVideoSchema = new mongoose.Schema({
  videoUrl: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  subject: { type: String, default: "" },
  gradeLevel: { type: String, default: "" },
  dateUploaded: { type: Date, default: Date.now() },
});

// compile model from schema
module.exports = mongoose.model("YouTubeVideo", YouTubeVideoSchema);
