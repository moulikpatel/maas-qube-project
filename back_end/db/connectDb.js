import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("Successfully connected to database");
    });
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
