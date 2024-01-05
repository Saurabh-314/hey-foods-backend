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
  console.log("decodedToken", decodedToken)
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