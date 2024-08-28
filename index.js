import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectsRoute.js";
import documentRoutes from "./routes/documentRoute.js";

//configuring dotenv
dotenv.config();


// Enable CORS for all routes
app.use(cors());

// Allow preflight requests for all routes
app.options('*', cors());


//importing db
db();

const app = express();


app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

//path for getting data from database
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/documentation", documentRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`.white.underline.bold);
});
