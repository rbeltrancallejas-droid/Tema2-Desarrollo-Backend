const express = require('express');

const router = express.Router();

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');


// GET - Obtener todos los libros
router.get('/books', getBooks);


// GET - Obtener un libro por ID
router.get('/books/:id', getBookById);


// POST - Crear un libro
router.post(
  '/books',
  verifyToken,
  authorizeRoles(1),
  createBook
);


// PUT - Actualizar un libro
router.put(
  '/books/:id',
  verifyToken,
  authorizeRoles(1),
  updateBook
);


// DELETE - Eliminar un libro
router.delete(
  '/books/:id',
  verifyToken,
  authorizeRoles(1),
  deleteBook
);


module.exports = router;