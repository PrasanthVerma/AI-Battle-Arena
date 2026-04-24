import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";


//Regiter controller , Register a new user
export const RegisterController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  res.cookie("token", token);
  return res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

//Login controller , Login a user
export const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get user profile controller , Get the profile of the logged in user
export const GetProfileController=async(req:Request,res:Response)=>{
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({Message:"Unauthorized"})
  }
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {userId:string};
    const user = await User.findById(decoded.userId).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getProfileController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}