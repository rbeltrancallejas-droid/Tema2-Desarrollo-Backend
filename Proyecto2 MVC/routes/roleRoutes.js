const express = require('express');

const router = express.Router();

const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
} = require('../controllers/roleController');


// GET - Obtener todos los roles
router.get('/roles', getRoles);


// GET - Obtener un rol por ID
router.get('/roles/:id', getRoleById);


// POST - Crear un rol
router.post('/roles', createRole);


// PUT - Actualizar un rol
router.put('/roles/:id', updateRole);


// DELETE - Eliminar un rol
router.delete('/roles/:id', deleteRole);


// This route handles requests related to roles.
// It connects each HTTP method with its corresponding controller function.

module.exports = router;