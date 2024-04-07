import mongoose from "mongoose";

const hisabSchema = new mongoose.Schema(
  {
    user_Id: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    paymentMode: {
      type: String,
      required: [true, "Payment mode is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("hisab", hisabSchema);
