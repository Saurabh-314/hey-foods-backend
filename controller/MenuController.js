import Menu from "../model/MenuModel.js";

export const register = async (req, res) => {
  try {
    const data = await Menu.create(req.body);
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