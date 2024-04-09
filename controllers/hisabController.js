import JWT from "jsonwebtoken";
import hisabModel from "../models/hisabModel.js";
import moment from "moment";

export const addHisabController = async (req, res) => {
  try {
    const { user_Id, date, amount, description, paymentMode } = req.body;
    const _id = JWT.verify(user_Id, process.env.JSONWEBTOKENKEY);
    const newHisab = await new hisabModel({
      user_Id: _id,
      date: new Date(date),
      amount,
      description,
      paymentMode,
    }).save();
    return res.status(200).send({
      success: true,
      message: "Hisab added successfully",
      newHisab,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in adding hisab...",
    });
  }
};

export const getAllHisabController = async (req, res) => {
  try {
    const { token, dateFilter, modeFilter, selectedDate } = req.body;
    const sd1 = new Date(selectedDate[0]);
    const sd2 = new Date(selectedDate[1]);

    let date1 = new Date(sd1?.getTime() + 86400000);
    let date2 = new Date(sd2?.getTime() + 86400000);

    date1?.toLocaleDateString();
    date2?.toLocaleDateString();

    const _id = JWT.verify(token, process.env.JSONWEBTOKENKEY);
    const userWiseHisab = await hisabModel.find({
      user_Id: _id,
      ...(modeFilter === "All" && { user_Id: _id }),
      ...(modeFilter !== "select" &&
        modeFilter !== "All" && { paymentMode: modeFilter }),
      ...(dateFilter >= 1
        ? {
            date: {
              $gt: moment().subtract(Number(dateFilter), "d").toDate(),
            },
          }
        : dateFilter === "All"
        ? { user_Id: _id }
        : {}),
      ...(selectedDate.length > 0 && {
        date: {
          $gte: date1,
          $lte: date2,
        },
      }),
    });
    res.status(200).send({
      success: true,
      message: "Fetched Successfully",
      userWiseHisab,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Fetching Details...",
    });
  }
};

export const deleteHisabController = async (req, res) => {
  try {
    const { id } = req.params;
    await hisabModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in deleteing hisab",
    });
  }
};

export const editHisabController = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, amount, paymentMode, description } = req.body;
    await hisabModel.findOneAndUpdate(
      { _id: id },
      { date: new Date(date), amount, paymentMode, description },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in deleteing hisab",
    });
  }
};
