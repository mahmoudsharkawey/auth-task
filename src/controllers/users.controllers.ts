import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import config from "../config";
import bcrypt from "bcrypt";

const userModel = new UserModel();

// Register controller
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: "success",
      data: { ...user },
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Login controller
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Check User
    const user = await userModel.findOne(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered",
      });
    }
    //Check password
    const isPasswordValid = await bcrypt.compare(password, `${user.password}`);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    res.json({
      status: "success",
      data: user,
      message: "User login successfully",
    });
  } catch (err) {
    next(err);
  }
};

// authenticate controller
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.authenticate(email, password);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "the email and password do not match please try again",
      });
    }
    return res.json({
      status: "success",
      data: { ...user, token },
      message: "user authenticated successfully",
    });
  } catch (err) {
    return next(err);
  }
};
