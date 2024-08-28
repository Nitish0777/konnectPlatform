import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  image: String,
  heading: String,
  description: String,
  project_id: mongoose.Schema.Types.ObjectId,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
