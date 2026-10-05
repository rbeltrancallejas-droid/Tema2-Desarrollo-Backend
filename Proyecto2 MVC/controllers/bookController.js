const BookService = require('../services/bookService');

const logAction = (type, message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}] ${message}`);
};


// GET - Obtener todos los libros
const getBooks = async (req, res, next) => {

  try {

    const books = await BookService.getBooks();

    logAction("INFO", "Books retrieved successfully");

    res.status(200).json(books);

  } catch (error) {

    logAction("ERROR", "Error retrieving books");

    next(error);

  }

};


// GET - Obtener un libro por ID
const getBookById = async (req, res, next) => {

  try {

    const { id } = req.params;

    const book = await BookService.getBookById(id);

    if (!book) {

      logAction("WARN", `Book with ID ${id} not found`);

      return res.status(404).json({
        error: "Book not found"
      });

    }

    logAction("INFO", `Book with ID ${id} retrieved successfully`);

    res.status(200).json(book);

  } catch (error) {

    logAction("ERROR", "Error retrieving book");

    next(error);

  }

};


// POST - Crear un libro
const createBook = async (req, res, next) => {

  try {

    const {
      title,
      author,
      isbn,
      price,
      stock,
      categoryId
    } = req.body;

    if (
      !title ||
      !author ||
      !isbn ||
      price === undefined ||
      stock === undefined
    ) {

      logAction("WARN", "Missing book data");

      return res.status(400).json({
        error: "All book fields are required"
      });

    }

    const book = await BookService.createBook(
      title,
      author,
      isbn,
      price,
      stock,
      categoryId
    );

    logAction("INFO", "Book created successfully");

    res.status(201).json(book);

  } catch (error) {

    logAction("ERROR", "Error creating book");

    next(error);

  }

};


// PUT - Actualizar un libro
const updateBook = async (req, res, next) => {

  try {

    const { id } = req.params;

    const {
      title,
      author,
      isbn,
      price,
      stock,
      categoryId
    } = req.body;

    if (
      !title ||
      !author ||
      !isbn ||
      price === undefined ||
      stock === undefined
    ) {

      logAction("WARN", "Missing book data");

      return res.status(400).json({
        error: "All book fields are required"
      });

    }

    const book = await BookService.updateBook(
      id,
      title,
      author,
      isbn,
      price,
      stock,
      categoryId
    );

    if (!book) {

      logAction("WARN", `Book with ID ${id} not found`);

      return res.status(404).json({
        error: "Book not found"
      });

    }

    logAction("INFO", `Book with ID ${id} updated successfully`);

    res.status(200).json(book);

  } catch (error) {

    logAction("ERROR", "Error updating book");

    next(error);

  }

};


// DELETE - Eliminar un libro
const deleteBook = async (req, res, next) => {

  try {

    const { id } = req.params;

    const book = await BookService.deleteBook(id);

    if (!book) {

      logAction("WARN", `Book with ID ${id} not found`);

      return res.status(404).json({
        error: "Book not found"
      });

    }

    logAction("INFO", `Book with ID ${id} deleted successfully`);

    res.status(200).json({
      message: "Book deleted successfully",
      book
    });

  } catch (error) {

    logAction("ERROR", "Error deleting book");

    next(error);

  }

};


module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};