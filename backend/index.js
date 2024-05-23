import express, { response } from "express";
import { PORT, MONGO_URL } from "./config.js";
import { City } from "./models/cityModel.js";
import mongoose from "mongoose";
import cityRoutes from "./routes/cityRoutes.js";
import cors from "cors";

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware for handling CORS
app.use(cors()); // default all origins

app.get("/", (request, response) => {
  // console.log(request);
  return response.status(200).send("HELLO");
});

app.use("/city", cityRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
