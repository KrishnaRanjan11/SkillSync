import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/edustack", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/courses", courseRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
