const pool = require("../database");

const ClientModel = {

  // Get all clients
  FindAllClients: async () => {

    try {

      const result = await pool.query(
        "SELECT * FROM client_records"
      );

      return result.rows;

    } catch (error) {

      throw error;

    }

  },

  // Get client by ID
  FindClientById: async (id) => {

    try {

      const result = await pool.query(
        "SELECT * FROM client_records WHERE id = $1",
        [id]
      );

      return result.rows[0];

    } catch (error) {

      throw error;

    }

  },

  // Create client
  CreateClient: async (
    unsername,
    paymaent_status,
    comission_status,
    deadline
  ) => {

    try {

      const result = await pool.query(
        `INSERT INTO client_records
        (unsername, paymaent_status, comission_status, deadline)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
          unsername,
          paymaent_status,
          comission_status,
          deadline
        ]
      );

      return result.rows[0];

    } catch (error) {

      throw error;

    }

  },

  // Update client
  UpdateClient: async (
    id,
    unsername,
    paymaent_status,
    comission_status,
    deadline
  ) => {

    try {

      const result = await pool.query(
        `UPDATE client_records
        SET unsername = $1,
            paymaent_status = $2,
            comission_status = $3,
            deadline = $4
        WHERE id = $5
        RETURNING *`,
        [
          unsername,
          paymaent_status,
          comission_status,
          deadline,
          id
        ]
      );

      return result.rows[0];

    } catch (error) {

      throw error;

    }

  },

  // Delete client
  DeleteClient: async (id) => {

    try {

      const result = await pool.query(
        "DELETE FROM client_records WHERE id = $1 RETURNING *",
        [id]
      );

      return result.rows[0];

    } catch (error) {

      throw error;

    }

  },

};

module.exports = ClientModel;