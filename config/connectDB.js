import mongoose from "mongoose";
import "colors";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`"Connected to DB", ${mongoose.connection.host}`.bgCyan);
  } catch (error) {
    console.log(`${error}`.bgRed.white);
  }
};
export default connectDB;
