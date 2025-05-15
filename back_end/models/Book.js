import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
  },
  authorName: {
    type: String,
  },
  publishDate: {
    type: Date,
  },
  image: {
    type: String,
    default:
      "https://c8.alamy.com/comp/W1HB7G/blue-book-school-on-white-background-vector-illustration-W1HB7G.jpg",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});
const bookModel = mongoose.model("Book", bookSchema);
export default bookModel;
