import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const url = process.env.MONGO_DB_URL;
const databaseName = process.env.MONGO_DB_NAME;

// const MONGO_URL = `mongodb+srv://${username}:${password}@${url}/${databaseName}?retryWrites=true&w=majority`;
const MONGO_URL = `mongodb://127.0.0.1:27017/hey-foods`;

async function connect() {
  try {
    mongoose.connect(MONGO_URL);
    console.log("database connection successfull")
  } catch (error) {
    console.log('Error while connecting with the database', error.message);
  }

}
export default connect;