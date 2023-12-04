import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import bodyParser from "body-parser";
import dotenv from "dotenv";
import connect from "./database/mongodb.js";
import routes from "./routes/index.js";

dotenv.config();
mongoose.set('strictQuery', true);

const PORT = 5500;
const app = express();
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json())

app.use('/api/v1', routes);

await connect();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`) // npm run start
})