import Projects from "../models/project.js";
import unzipper from "unzipper";
import path from "path";
import fs from "fs";

const uploadProject = async (req, res) => {
  try {
    const { titel, discription, user_id, techStack, status } = req.body;
    let folderStructure;
    let { originalname } = req.file;
    const folderName = originalname.slice(0, -4);
    originalname = originalname.split(" ").join("");
    const zipBuffer = req.file.buffer;
    const myPath = `Projects/${user_id}`;
    const newFileName = `${Date.now()}_${originalname}`;

    // make dir
    if (!fs.existsSync(myPath)) {
      fs.mkdirSync(myPath, { recursive: true });
    }
    // uploading file
    fs.writeFileSync(`${myPath}/${newFileName}`, zipBuffer);
    let fileUrl = `${req.protocol}://${req.get(
      "host"
    )}/${myPath}/${newFileName}`;
    fileUrl = fileUrl.replace("/Projects", ""); // remove /Projects from url
    // extract zip file

    const zipFilePath = `./${myPath}/${newFileName}`; // Replace with the path to your ZIP file
    const extractionDir = `./${myPath}`; // Replace with the extraction destination

    fs.createReadStream(zipFilePath)
      .pipe(unzipper.Extract({ path: extractionDir }))
      .on("entry", (entry) => {
        const entryPath = `${extractionDir}/${entry.path}`;
        if (entry.type === "Directory") {
          // Create directory if it doesn't exist
          fs.mkdirSync(entryPath, { recursive: true });
        } else {
          // Create a write stream for the file
          const writeStream = fs.createWriteStream(entryPath);
          entry.pipe(writeStream);
        }
      })
      .on("close", async () => {
        console.log(`ZIP file extracted to ${extractionDir}`);
        // calling folderTraverse
        const folderPathToTraverse = `./${myPath}/${folderName}`;
        folderStructure = buildFolderStructure(folderPathToTraverse);
        const project = await Projects.create({
          status,
          titel,
          discription,
          user_id,
          techStack,
          filePath: fileUrl,
          folderStructure,
        });
        // res.status(200).json({msg:"Profile Created SuccessFully"});
        // return res.json({ success: true, msg: "project upload with info" })
        res.json(project);
      })
      .on("error", (err) => {
        res.status(500).send({ success: false, msg: "project not uploaded" });
        console.error("Error extracting ZIP file:", err);
      });

    // folder structure
    function buildFolderStructure(folderPath) {
      const stats = fs.statSync(folderPath);
      if (!stats.isDirectory()) {
        return null; // Not a folder
      }

      const folderName = path.basename(folderPath);
      const children = [];

      const files = fs.readdirSync(folderPath);
      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isDirectory()) {
          const childFolder = buildFolderStructure(filePath);
          if (childFolder) {
            children.push(childFolder);
          }
        } else if (fileStats.isFile()) {
          children.push({
            type: "file",
            name: file,
            path: filePath.replace(/\\/g, "/").replace("Projects", ""),
          });
        }
      });
      return res.status(200).send({
        success: true,
        msg: "project uploaded",
        type: "folder",
        name: folderName,
        children,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, msg: "project not uploaded" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Projects.find({ _id: req.params.id });
    return res.status(200).json({ success: true, allProjects });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, msg: "server error in getting all projects" });
  }
};

const getProjectsOnGoing = async (req, res) => {
  try {
    const { user_id } = req.body;
    const data = await Projects.find(
      { user_id },
      { _id: 1, title: 1, discription: 1, techStack: 1, status: 1 }
    );
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, msg: "server error in uploading project" });
  }
};

export { uploadProject, getProjectsOnGoing, getAllProjects };
