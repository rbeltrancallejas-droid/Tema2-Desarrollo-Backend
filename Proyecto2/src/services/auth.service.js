const { User } = require('../models');
const jwt = require('jsonwebtoken');

class AuthService {
    static async registerUser(userData) {
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new Error('El usuario ya existe');
        }
        const newUser = await User.create(userData);
        const { password, ...userWithoutPassword } = newUser.toJSON();
        return userWithoutPassword;
    }

    static async loginUser(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return {
            token, user: { id: user.id, email: user.email, role: user.role },
        };
    }
}
module.exports = AuthService;