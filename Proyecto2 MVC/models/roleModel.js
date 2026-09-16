const pool = require("../database");

const RoleModel = {

  // Get all roles
  FindAllRoles: async () => {

    try {

      const result = await pool.query(
        "SELECT * FROM roles"
      );

      return result.rows;

    } catch (error) {

      throw error;

    }

  },

  // Get role by ID
  FindRoleById: async (id) => {

    try {

      const result = await pool.query(
        "SELECT * FROM roles WHERE id = $1",
        [id]
      );

      return result.rows[0];

    } catch (error) {

      throw error;

    }

  },

  // Create role
  CreateRole: async (name, description) => {

    try {

      const result = await pool.query(
        `INSERT INTO roles
        (name, description)
        VALUES ($1, $2)
        RETURNING *`,
        [
          name,
          description
        ]
      );

      return result.rows[0];

    } catch (error) {

      throw error;

    }

  },

  // Update role
  UpdateRole: async (id, name, description) => {

    try {

      const result = await pool.query(
        `UPDATE roles
        SET name = $1,
            description = $2
        WHERE id = $3
        RETURNING *`,
        [
          name,
          description,
          id
        ]
      );

      return result.rows[0];

    } catch (error) {

      throw error;

    }

  },

  // Delete role
  DeleteRole: async (id) => {

    try {

      const result = await pool.query(
        "DELETE FROM roles WHERE id = $1 RETURNING *",
        [id]
      );

      return result.rows[0];

    } catch (error) {

      throw error;

    }

  },

};

module.exports = RoleModel;