import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./database/mongodb.js";
import routes from "./routes/index.js";
import CustomError from "./utils/CustomError.js";
import { globalErrorHandler } from "./controller/ErrorController.js";

// process.on('uncaughtException', (err) => {
//   console.log(err.name, err.message);
//   console.log("Uncaught Exception Occured! Shutting down...");
//   process.exit(1);
// })

dotenv.config();
mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json())


app.use('/api/v1', routes);

app.all("*", (req, res, next) => {
  const err = new CustomError(`Can't find url ${req.originalUrl} on the server!`, 404);
  next(err);
})

app.use(globalErrorHandler)

await connect();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`) // npm run start
})