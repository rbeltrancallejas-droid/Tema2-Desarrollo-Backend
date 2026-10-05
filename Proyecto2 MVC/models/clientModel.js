const pool = require("../database");

const ClientModel = {

  // Get all clients with pagination, search and filters
  FindAllClients: async (query = {}) => {

    try {

      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 5;

      const search = query.search || "";
      const paymaent_status = query.paymaent_status || "";
      const comission_status = query.comission_status || "";
      const deadline = query.deadline || "";

      const offset = (page - 1) * limit;

      const searchValue = `%${search}%`;

      // Construcción de condiciones
      const conditions = [
        `(unsername ILIKE $1
          OR paymaent_status ILIKE $1
          OR comission_status ILIKE $1)`
      ];

      const values = [searchValue];

      let parameterIndex = 2;

      // Filtro por estado de pago
      if (paymaent_status) {

        conditions.push(
          `paymaent_status ILIKE $${parameterIndex}`
        );

        values.push(paymaent_status);

        parameterIndex++;

      }

      // Filtro por estado de comisión
      if (comission_status) {

        conditions.push(
          `comission_status ILIKE $${parameterIndex}`
        );

        values.push(comission_status);

        parameterIndex++;

      }

      // Filtro por fecha límite
      if (deadline) {

        conditions.push(
          `deadline = $${parameterIndex}`
        );

        values.push(deadline);

        parameterIndex++;

      }

      const whereClause = conditions.join(" AND ");

      // Obtener el total de registros
      const countResult = await pool.query(
        `SELECT COUNT(*)
         FROM client_records
         WHERE ${whereClause}`,
        values
      );

      const totalItems = parseInt(
        countResult.rows[0].count
      );

      // Obtener clientes paginados
      const dataValues = [
        ...values,
        limit,
        offset
      ];

      const result = await pool.query(
        `SELECT *
         FROM client_records
         WHERE ${whereClause}
         ORDER BY id ASC
         LIMIT $${parameterIndex}
         OFFSET $${parameterIndex + 1}`,
        dataValues
      );

      const totalPages = Math.ceil(
        totalItems / limit
      );

      return {

        data: result.rows,

        pagination: {
          currentPage: page,
          limit: limit,
          totalItems: totalItems,
          totalPages: totalPages
        }

      };

    } catch (error) {

      throw error;

    }

  },


  // Get client by ID
  FindClientById: async (id) => {

    try {

      const clientId = Number(id);

      // Validar que el ID sea un número entero
      if (!Number.isInteger(clientId)) {
        return null;
      }

      const result = await pool.query(
        "SELECT * FROM client_records WHERE id = $1",
        [clientId]
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
        (
          unsername,
          paymaent_status,
          comission_status,
          deadline
        )
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

  }

};


module.exports = ClientModel;