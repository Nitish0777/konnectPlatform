import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailExtension: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  courses: {
    type: [String],
  },
});

const University = mongoose.model("University", universitySchema);

export default University;
