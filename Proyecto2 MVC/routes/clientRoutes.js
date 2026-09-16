const express = require('express');

const router = express.Router();

const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');


// GET - Obtener todos los clientes
router.get('/clients', getClients);


// GET - Obtener un cliente por ID
router.get('/clients/:id', getClientById);


// POST - Crear un cliente
router.post('/clients', createClient);


// PUT - Actualizar un cliente
router.put('/clients/:id', updateClient);


// DELETE - Eliminar un cliente
router.delete('/clients/:id', deleteClient);


// This route handles GET requests to retrieve all clients from the database.
// It uses the getClients controller function to fetch the data and send it back as a JSON response.

module.exports = router;