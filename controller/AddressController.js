import address from "../model/AddressModel.js";

export const register = async (req, res) => {
  const res1 = await address.create(req.body);
  res.status(201).json({
    message: "successful",
    data: {
      res1
    }
  })
  // console.log("address register", res1);
}