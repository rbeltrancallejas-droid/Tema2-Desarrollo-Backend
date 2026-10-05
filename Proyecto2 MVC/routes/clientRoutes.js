const express = require('express');

const router = express.Router();

const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');


// GET - Obtener todos los clientes
router.get('/clients', getClients);


// GET - Obtener un cliente por ID
router.get('/clients/:id', getClientById);


// POST - Crear un cliente
router.post(
  '/clients',
  verifyToken,
  authorizeRoles(1),
  createClient
);


// PUT - Actualizar un cliente
router.put(
  '/clients/:id',
  verifyToken,
  authorizeRoles(1),
  updateClient
);


// DELETE - Eliminar un cliente
router.delete(
  '/clients/:id',
  verifyToken,
  authorizeRoles(1),
  deleteClient
);


module.exports = router;