
const Book = require('../models/Book')

class bookController {
    static getAllBooks = async ( req, res ) => {
        const books = await Book.find();
        res.status(200).json({ message : "Books found successfully", books })
    }

    static getBookById = async ( req, res ) => {
        const {id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message : "Book not found"})
        }
        res.status(200).json({ message : "Book found successfully", book })
    }

    static createBook = async ( req, res ) => {
        const bookInfo = req.body;
        if (bookInfo === null || bookInfo === undefined) {
            return res.status(400).json({ message : "Invalid book information" });
        }
        const newBook = new Book(bookInfo);
        await newBook.save();
        res.status(201).json({ message : "Book created successfully", book : newBook })
    }

    static updateBook = async ( req, res ) => {
        const {id} = req.params;
        const bookInfo = req.body;
        const book = await Book.findByIdAndUpdate(id, bookInfo, { new : true });
        if (!book){
            return res.status(404).json({ message : " Book not found"})
        }
        res.status(200).json({ message : "Book updated successfully", book })
    }

    static deleteBook = async ( req, res ) => {
        const {id} = req.params;
        const deleteBook = await Book.findByIdAndDelete(id);
        if (!deleteBook) {
            return res.status(404).json({ message : "Book not found"})
        }
        res.status(200).json({ message : "Book deleted successfully"})
    }
}

module.exports = bookController;