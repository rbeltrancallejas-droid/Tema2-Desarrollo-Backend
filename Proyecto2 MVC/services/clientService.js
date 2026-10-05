const ClientModel = require('../models/clientModel');

const ClientService = {

  // Get all clients
  getClients: async (query) => {

    return await ClientModel.FindAllClients(query);

  },

  // Get client by ID
  getClientById: async (id) => {

    return await ClientModel.FindClientById(id);

  },

  // Create client
  createClient: async (
    unsername,
    paymaent_status,
    comission_status,
    deadline
  ) => {

    return await ClientModel.CreateClient(
      unsername,
      paymaent_status,
      comission_status,
      deadline
    );

  },

  // Update client
  updateClient: async (
    id,
    unsername,
    paymaent_status,
    comission_status,
    deadline
  ) => {

    return await ClientModel.UpdateClient(
      id,
      unsername,
      paymaent_status,
      comission_status,
      deadline
    );

  },

  // Delete client
  deleteClient: async (id) => {

    return await ClientModel.DeleteClient(id);

  },

};

module.exports = ClientService;