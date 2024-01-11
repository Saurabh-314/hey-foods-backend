import userModel from "../model/UserModel.js";
import restaurantModel from "../model/RestaurantModel.js";
import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import CustomeError from "../utils/CustomError.js";
import jwt from "jsonwebtoken";
import util from "util";


export const auth = asyncErrorHandler(async (req, res, next) => {

  const testToken = req.headers.authorization;
  let token
  if (testToken && testToken.startsWith('Bearer')) {
    token = testToken.split(" ")[1];
  }

  if (!token) {
    next(new CustomeError('You are not logged In!', 401))
  }
  const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  // console.log("decodedToken",decodedToken)
  const dbToken = await userModel.findOne({ _id: decodedToken._id }).select("+token");
  // console.log("dbToken",dbToken)

  if (dbToken.token === "") {
    next(new CustomeError("changed password, please login again! ", 404))
  }
  req.auth = decodedToken
  next();
})

export const restaurantAuth = asyncErrorHandler(async (req, res, next) => {
  const testToken = req.headers.authorization;
  let token
  if (testToken && testToken.startsWith('Bearer')) {
    token = testToken.split(" ")[1];
  }

  if (!token) {
    next(new CustomeError('You are not logged In!', 401))
  }
  const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  console.log("restaurant decodedToken", decodedToken)

  const dbToken = await restaurantModel.findOne({ _id: decodedToken._id }).select("+token");

  // console.log("dbToken", dbToken)
  if (dbToken.approval == "pending") {
    next(new CustomeError("Restaurant is under varifying, please wait some time", 404))
  }

  if (dbToken.token === "") {
    next(new CustomeError("changed password, please login again! ", 404))
  }
  req.auth = decodedToken
  next();
})

// for admin only
export const restrict = (role) => {
  return (req, res, next) => {
    if (req.auth.role !== role) {
      const error = new CustomeError('You do nat have permission to perform this action', 403);
      next(error);
    }
    next();
  }
}

// for restaurant only
export const shop = () => {
  return (req, res, next) => {
    next()
  }
}