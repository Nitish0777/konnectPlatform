import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  college: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  mobileNo: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  sem_year: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  connection: {
    type: Number,
    default: 0,
  },
  link: {
    website: {
      type: String,
      default: "",
    },
    linkdin: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
  },
  domain: {
    type: [String],
  },
  programming: {
    type: [String],
  },
  isMentor: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("User", userSchema);
