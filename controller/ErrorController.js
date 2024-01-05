import CustomError from "../utils/CustomError.js";

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error
  });
}

const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong! please try again later.',
    })
  }
}

const castErrorHandler = (err) => {
  const msg = `Invalid value for ${err.path} : ${err.value} `;
  return new CustomError(msg, 400);
}

const duplicateKeyError = (err) => {
  const msg = `There ${Object.keys(err.keyValue)[0]} is already exist.  Please use another ${Object.keys(err.keyValue)[0]}`;
  return new CustomError(msg, 400);
}

const ValidationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map(val => val.message);
  const errorMessages = errors.join('. ');
  const msg = `Invalid input data ${errorMessages}`;

  return new CustomError(msg, 400);
}

const handleExpiredJWT = (err) => {
  return new CustomError("JWT has expired. please login again!", 401);
}

const handleJWTError = (err) => {
  new CustomError('InValid token. Please loging again!', 401)
}

export const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    devErrors(res, error);
  }
  else if (process.env.NODE_ENV === 'production') {
    if (error.name === 'CastError') error = castErrorHandler(error);
    if (error.code === 11000) error = duplicateKeyError(error);
    if (error.name === 'ValidationError') error = ValidationErrorHandler(error);
    if (error.name === 'TokenExpiredError') error = handleExpiredJWT(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);

    prodErrors(res, error);
  }
}
