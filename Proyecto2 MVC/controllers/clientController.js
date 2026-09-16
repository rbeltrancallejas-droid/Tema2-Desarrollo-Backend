const ClientModel = require('../models/clientModel');

const logAction = (type, message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}] ${message}`);
};

// GET - Obtener todos los clientes
const getClients = async (req, res) => {
  try {
    const clients = await ClientModel.FindAllClients();

    logAction("INFO", "Clients retrieved successfully");
    res.status(200).json(clients);

  } catch (error) {
    logAction("ERROR", "Error retrieving clients");
    res.status(500).json({ error: error.message });
  }
};

// GET - Obtener un cliente por ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await ClientModel.FindClientById(id);

    if (!client) {
      logAction("WARN", `Client with ID ${id} not found`);

      return res.status(404).json({
        error: "Client not found"
      });
    }

    logAction("INFO", `Client with ID ${id} retrieved successfully`);
    res.status(200).json(client);

  } catch (error) {
    logAction("ERROR", "Error retrieving client");
    res.status(500).json({ error: error.message });
  }
};

// POST - Crear un cliente
const createClient = async (req, res) => {
  try {
    const {
      unsername,
      paymaent_status,
      comission_status,
      deadline
    } = req.body;

    if (
      !unsername ||
      !paymaent_status ||
      !comission_status ||
      !deadline
    ) {
      logAction("WARN", "Missing client data");

      return res.status(400).json({
        error: "All client fields are required"
      });
    }

    const client = await ClientModel.CreateClient(
      unsername,
      paymaent_status,
      comission_status,
      deadline
    );

    logAction("INFO", "Client created successfully");
    res.status(201).json(client);

  } catch (error) {
    logAction("ERROR", "Error creating client");
    res.status(500).json({ error: error.message });
  }
};

// PUT - Actualizar un cliente
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      unsername,
      paymaent_status,
      comission_status,
      deadline
    } = req.body;

    if (
      !unsername ||
      !paymaent_status ||
      !comission_status ||
      !deadline
    ) {
      logAction("WARN", "Missing client data");

      return res.status(400).json({
        error: "All client fields are required"
      });
    }

    const client = await ClientModel.UpdateClient(
      id,
      unsername,
      paymaent_status,
      comission_status,
      deadline
    );

    if (!client) {
      logAction("WARN", `Client with ID ${id} not found`);

      return res.status(404).json({
        error: "Client not found"
      });
    }

    logAction("INFO", `Client with ID ${id} updated successfully`);
    res.status(200).json(client);

  } catch (error) {
    logAction("ERROR", "Error updating client");
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Eliminar un cliente
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await ClientModel.DeleteClient(id);

    if (!client) {
      logAction("WARN", `Client with ID ${id} not found`);

      return res.status(404).json({
        error: "Client not found"
      });
    }

    logAction("INFO", `Client with ID ${id} deleted successfully`);

    res.status(200).json({
      message: "Client deleted successfully",
      client
    });

  } catch (error) {
    logAction("ERROR", "Error deleting client");
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};