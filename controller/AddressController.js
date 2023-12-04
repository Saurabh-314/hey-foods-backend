import address from "../model/AddressModel.js";

export const register = async (req, res) => {
  try {
    const data = await address.create(req.body);
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