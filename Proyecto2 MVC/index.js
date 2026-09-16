const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const clientRoutes = require('./routes/clientRoutes');
const roleRoutes = require('./routes/roleRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', clientRoutes);
app.use('/api', roleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});