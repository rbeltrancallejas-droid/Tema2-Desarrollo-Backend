const pool = require("../database");

const UserModel = {

  // Get user by nickname
  FindUserByNickname: async (nickname) => {

    try {

      const result = await pool.query(
        `SELECT 
          id,
          nickname,
          password,
          email,
          role
        FROM usuarios
        WHERE nickname = $1`,
        [nickname]
      );

      return result.rows[0];

    } catch (error) {

      throw error;

    }

  },

};

module.exports = UserModel;