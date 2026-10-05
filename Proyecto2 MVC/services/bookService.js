const Book = require('../models/book.Model');

const BookService = {

  // Get all books
  getBooks: async () => {

    return await Book.findAll();

  },


  // Get book by ID
  getBookById: async (id) => {

    return await Book.findByPk(id);

  },


  // Create book
  createBook: async (
    title,
    author,
    isbn,
    price,
    stock,
    categoryId
  ) => {

    return await Book.create({
      title,
      author,
      isbn,
      price,
      stock,
      categoryId
    });

  },


  // Update book
  updateBook: async (
    id,
    title,
    author,
    isbn,
    price,
    stock,
    categoryId
  ) => {

    const book = await Book.findByPk(id);

    if (!book) {
      return null;
    }

    await book.update({
      title,
      author,
      isbn,
      price,
      stock,
      categoryId
    });

    return book;

  },


  // Delete book
  deleteBook: async (id) => {

    const book = await Book.findByPk(id);

    if (!book) {
      return null;
    }

    await book.destroy();

    return book;

  }

};

module.exports = BookService;