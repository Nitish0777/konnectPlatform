import document from "../models/document.js";

const uploadDocumentation = async (req, res) => {
  try {
    let filesUrl = null;
    const { heading, discription, project_id } = req.body;

    if (req.files) {
      const file = req.files.docImg;
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error In Uploading Doument",
      error: error.message,
    });
  }
};

export { uploadDocumentation };
