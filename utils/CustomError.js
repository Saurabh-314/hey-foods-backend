class CustomeError extends Error{
  constructor(message,statusCode){
    super(message);
    this.statusCode = statusCode;
    // if(statusCode >= 400 && statusCode < 500){
    //   console.log("400 - 500")
    //   this.status = "fail";
    // }else{
    //   this.status = "error";
    // }

    // if(statusCode > 200 && statusCode < 400){
    //   console.log("200-400")
    //   this.status = "fail";
    // }else{
    //   this.status = "error";
    // }
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this,this.constructor)
  }
} 

export default CustomeError;