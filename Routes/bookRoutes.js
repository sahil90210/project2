const express = require("express");
const router = express.Router();

const {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin Only
router.post("/", authMiddleware, adminMiddleware, addBook);

router.put("/:id", authMiddleware, adminMiddleware, updateBook);

router.delete("/:id", authMiddleware, adminMiddleware, deleteBook);

// Admin & User
router.get("/", authMiddleware, getAllBooks);

router.get("/:id", authMiddleware, getBookById);

module.exports = router;