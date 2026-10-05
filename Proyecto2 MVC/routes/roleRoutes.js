const express = require('express');

const router = express.Router();

const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} = require('../controllers/roleController');

const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');


// GET - Obtener todos los roles
router.get(
  '/roles',
  verifyToken,
  getRoles
);


// GET - Obtener un rol por ID
router.get(
  '/roles/:id',
  verifyToken,
  getRoleById
);


// POST - Crear un rol
router.post(
  '/roles',
  verifyToken,
  authorizeRoles(1),
  createRole
);


// PUT - Actualizar un rol
router.put(
  '/roles/:id',
  verifyToken,
  authorizeRoles(1),
  updateRole
);


// DELETE - Eliminar un rol
router.delete(
  '/roles/:id',
  verifyToken,
  authorizeRoles(1),
  deleteRole
);


// This route handles requests related to roles.
// It connects each HTTP method with its corresponding controller function.

module.exports = router;