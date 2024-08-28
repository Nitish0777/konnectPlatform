import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  tite: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
    max: 250,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  staus: {
    type: Boolean,
  },
  contributors: {
    type: [String],
  },
  techStack: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  filePath: {
    type: String,
    default: "",
  },
  folderStructure: mongoose.Schema.Types.Mixed,
  zipBuffer: Buffer,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
