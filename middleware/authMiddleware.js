import asyncErrorHandler from "../utils/AsyncErrorHandler.js";
import CustomeError from "../utils/CustomError.js";
import jwt from "jsonwebtoken";
import util from "util";


export const auth = asyncErrorHandler(async (req, res, next) => {

  const testToken = req.headers.authorization;
  let token
  if (testToken && testToken.startsWith('bearer')) {
    token = testToken.split(" ")[1];
  }

  if (!token) {
    next(new CustomeError('You are not logged In!', 401))
  }
  const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  console.log("decodedToken", decodedToken)
  req.auth = decodedToken
  next();
})

export const adminOnly = asyncErrorHandler(async (req, res, next) => {
  console.log("admin only route")
  const testToken = req.headers.authorization;
  let token
  if (testToken && testToken.startsWith('bearer')) {
    token = testToken.split(" ")[1];
  }

  if (!token) {
    next(new CustomeError('You are not logged In!', 401))
  }
  const decodedToken = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  console.log("decoded", decodedToken);
  // console.log("admin only token", token)

  if (decodedToken.role != 'admin') {
    next(new CustomeError('You are not Authorized', 401))
  }
  req._id = decodedToken._id;
  // console.log(token)

  next();
})