import ProductModel from "../model/ProductModel.js";

export const register = async (req, res) => {
  try {
    const data = await ProductModel.create(req.body);
    res.status(201).json({
      message: "success",
      data: {
        data
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    })
  }
}

export const getAllProduct = async (req, res) => {
  try {
    const data = await ProductModel.find();
    res.status(200).json({
      message: "success",
      data: {
        data
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    })
  }
}

export const productById = async (req, res) => {
  console.log(req.param)
  // try {
  //   const { id } = req.param;
  //   const data = await ProductModel.findById(id)
  //   res.status(200).json({
  //     message: "success",
  //     data: {
  //       data
  //     }
  //   })
  // } catch (error) {
    // res.status(400).json({
    //   status: "fail",
    //   message: error.message
    // })
  // }
}