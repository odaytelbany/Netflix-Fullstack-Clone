import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email!" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 chars!",
      });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already exist!" });
    }

    const existingUsername = await User.findOne({ username: username });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "User Name Already exist!" });
    }

    const profileImages = ["/avatar1", "/avatar2", "/avatar3"];
    const image = profileImages[Math.floor(Math.random() * profileImages.length)];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      image,
    });
    generateTokenAndSetCookies(newUser._id, res);
    await newUser.save();
    res
      .status(201)
      .json({
        success: true,
        data: { user: { ...newUser._doc, password: "" } },
      });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(400).json({ success: false, message: "Internal Server Error!" });
  }
};
export const signin = async (req, res) => {
  res.send("signin route");
};
export const logout = async (req, res) => {
  res.send("logout route");
};
