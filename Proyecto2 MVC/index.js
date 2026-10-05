const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 

const { sequelize } = require('./models');
 
const app = express(); 
const PORT = process.env.PORT || 3000; 
 
const clientRoutes = require('./routes/clientRoutes'); 
const roleRoutes = require('./routes/roleRoutes'); 
const authRoutes = require('./routes/authRoutes'); 
const bookRoutes = require('./routes/bookRoutes'); 
 
const errorMiddleware = require('./middlewares/errorMiddleware'); 
 
app.use(cors()); 
app.use(express.json()); 
 
 
// Rutas 
app.use('/api', clientRoutes); 
app.use('/api', authRoutes); 
app.use('/api', roleRoutes); 
app.use('/api', bookRoutes); 
 
// Manejo de rutas no encontradas 
app.use((req, res) => { 
  res.status(404).json({ 
    error: "Endpoint not found" 
  }); 
}); 
 
// Middleware centralizado de errores 
app.use(errorMiddleware); 
 
sequelize.sync({ alter: true })
  .then(() => {

    console.log('Sequelize connected and models synchronized');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((error) => {

    console.error('Error connecting Sequelize:', error.message);

  });