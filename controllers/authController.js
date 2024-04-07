import userModel from "../models/userModel.js";
import hisabModel from "../models/hisabModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return res.send({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.send({
        success: false,
        message: "Already registered, Please login",
      });
    }
    const hashPass = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashPass,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registered Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.send({
        success: false,
        message: "Please fill all fields",
      });
    }
    let userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(200).send({
        success: false,
        message: "Please Register Before Login",
      });
    }
    const decryptedPass = await comparePassword(password, userExist.password);
    if (!decryptedPass) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = JWT.sign({ _id: userExist._id }, process.env.JSONWEBTOKENKEY);

    const addToken = await userModel.findByIdAndUpdate(
      userExist._id,
      { token },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      userExist,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export const activeUserController = async (req, res) => {
  try {
    const { token } = req.params;
    const _id = JWT.verify(token, process.env.JSONWEBTOKENKEY);
    const user = await userModel.findById(_id);
    return res.status(200).send({
      success: true,
      message: "Success",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userModel.findOneAndDelete({ email });
    const user_Id = user._id;
    await hisabModel.deleteMany({ user_Id });
    return res
      .status(200)
      .send({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
