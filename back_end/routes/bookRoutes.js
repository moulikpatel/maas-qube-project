import express from "express";
import {
  allBooks,
  createBook,
  deleteBook,
  getMyBooks,

  updateBook,
  viewBook,
} from "../controller/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookRouter = express.Router();

bookRouter.post("/create", protect, createBook);
bookRouter.get("/all", allBooks);
bookRouter.get("/:id", viewBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.put("/update", updateBook);
bookRouter.get("/mybooks/:id",getMyBooks)

export default bookRouter;
