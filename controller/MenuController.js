import Menu from "../model/MenuModel.js";

export const register = async (req,res)=>{
  const res1 = await Menu.create(req.body);
  res.status(201).json({
    message: "successful",
    data: {
      res1
    }
  })
}