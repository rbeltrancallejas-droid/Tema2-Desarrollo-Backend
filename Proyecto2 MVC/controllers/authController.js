const AuthService = require('../services/authService');

const logAction = (type, message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${type}] ${message}`);
};


// POST - Iniciar sesión
const login = async (req, res) => {

  try {

    const {
      nickname,
      password
    } = req.body;

    if (!nickname || !password) {

      logAction("WARN", "Missing login data");

      return res.status(400).json({
        error: "Nickname and password are required"
      });

    }

    const result = await AuthService.login(
      nickname,
      password
    );

    if (!result) {

      logAction(
        "WARN",
        `Invalid login attempt for user ${nickname}`
      );

      return res.status(401).json({
        error: "Invalid nickname or password"
      });

    }

    logAction(
      "INFO",
      `User ${nickname} logged in successfully`
    );

    res.status(200).json(result);

  } catch (error) {

    logAction("ERROR", "Error during login");

    res.status(500).json({
      error: error.message
    });

  }

};


module.exports = {
  login
};