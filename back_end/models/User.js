import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  Books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", 
    },
  ],
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
