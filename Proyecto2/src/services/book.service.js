const { Book } = require('../models');

class BookService {
    static async getAllBooks() {
        const books = await Book.findAll();
        return books;
    }

    static async getBookById(id) {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error('Libro no encontrado');
        }
        return book;
    }
    static async createBook(bookData) {
        const newBook = await Book.create(bookData);
        return newBook;
    }

    static async updateBook(id, bookData) {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error('Libro no encontrado');
        }
        await book.update(bookData);
        return book;
    }
}
module.exports = BookService;