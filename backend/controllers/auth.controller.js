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
    const image =
      profileImages[Math.floor(Math.random() * profileImages.length)];

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
    res.status(201).json({
      success: true,
      data: { user: { ...newUser._doc, password: "" } },
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All Fields are required!" });
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials!" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials!" });
    }

    generateTokenAndSetCookies(user._id, res);
    res.status(200).json({
      success: true,
      data: { user: { ...user._doc, password: "" } },
    });
  } catch (error) {
    console.log("Error in Sign in controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully!" });
  } catch (error) {
    console.log("Error in Log out controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
export const authCheck = async (req, res) => {
  try {
    res.status(200).json({success: true, user: req.user});
  } catch (error) {
    console.log("Error in auth check controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
