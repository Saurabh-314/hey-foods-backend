import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { userId, firstName, lastName, email, password, dob, gender, mobileNumber, deviceToken } = req.body;
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    return res.status(406).json({ message: "Email already exists" })
  }
  const existsNumber = await User.findOne({ mobileNumber });
  if (existsNumber) {
    return res.status(406).json({ message: "Mobile Number already exists" })
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User({
    userId, firstName, lastName, email, password: hashedPassword, dob, gender, mobileNumber, deviceToken
  });
  await user.save();
  res.status(201).json({ status: "success" })
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("password");
  // console.log("login user", user)
  if (!user) {
    return res.status(406).json({ message: "User not found" });
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    return res.status(406).json({ message: "User Name or Password is incorrect" });
  }

  // create payload
  const payload = {
    email,
    _id: user._id,
  }

  // create jwt token
  const token = jwt.sign(payload, "somesecretekey");

  res.status(200).json({
    status: "success",
    data: {
      token
    }
  });
}