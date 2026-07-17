const Book = require("../models/Book");

// Add Book (Admin)
const addBook = async (req, res) => {
    try {

        const { title, author, category, isbn, availableCopies } = req.body;

        // Check Required Fields
        if (!title || !author || !category || !isbn) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check Duplicate ISBN
        const existingBook = await Book.findOne({ isbn });

        if (existingBook) {
            return res.status(400).json({
                message: "Book with this ISBN already exists"
            });
        }

        const book = await Book.create({
            title,
            author,
            category,
            isbn,
            availableCopies
        });

        res.status(201).json({
            message: "Book Added Successfully",
            book
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Books
const getAllBooks = async (req, res) => {

    try {

        const books = await Book.find();

        res.status(200).json(books);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Single Book
const getBookById = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json(book);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update Book
const updateBook = async (req, res) => {

    try {

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "Book Updated Successfully",
            book
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Book
const deleteBook = async (req, res) => {

    try {

        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        res.status(200).json({
            message: "Book Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};