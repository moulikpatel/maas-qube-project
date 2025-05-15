import Book from "../models/Book.js";
import user from "../models/User.js";

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { bookName, authorName, publishDate } = req.body;

    const newBook = new Book({
      bookName,
      authorName,
      publishDate,
      user: req.user._id,
    });

    const savedBook = await newBook.save();

    // Optional: Push the book to the user's Books array if it exists
    const userDoc = await user.findById(req.user._id);
    if (userDoc.Books) {
      userDoc.Books.push(savedBook._id); // Store just the ID
      await userDoc.save();
    }

    res.status(201).json({
      message: "Book created successfully",
      book: savedBook,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create book",
      error: err.message,
      success: false,
    });
  }
};

// View a single book by ID
export const viewBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving book", error: err.message });
  }
};

// View all books
export const allBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("user");
    res.status(200).json(books);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch books", error: err.message });
  }
};

// Delete a book by ID

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the book to get the user reference
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const userId = book.user;

    // 2. Delete the book
    await Book.findByIdAndDelete(id);

    // 3. Remove the book reference from the user's Books array
    await user.findByIdAndUpdate(userId, {
      $pull: { Books: id },
    });

    res.status(200).json({ success:true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success:false,
      message: "Error deleting book",
      error: err.message,
    });
  }
};

// Update a book
export const updateBook = async (req, res) => {
  try {
    const { id, bookName, authorName, publishDate } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { bookName, authorName, publishDate, image },
      { new: true }
    );

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating book", error: err.message });
  }
};

export const getMyBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const userr = await user.findOne({ _id: id }).populate("Books");
    console.log(userr);

    if (!userr) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      mybooks: userr.Books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
