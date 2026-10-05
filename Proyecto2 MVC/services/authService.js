const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/userModel');

const AuthService = {

  // Login
  login: async (nickname, password) => {

    const user = await UserModel.FindUserByNickname(nickname);

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return null;
    }

    const token = jwt.sign(
      {
        id: user.id,
        nickname: user.nickname,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    return {
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        role: user.role
      }
    };

  },

};

module.exports = AuthService;