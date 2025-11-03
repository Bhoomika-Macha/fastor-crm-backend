const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const employeeRoutes = require('./routes/employeeRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Base routes
app.get('/', (req, res) => {
  res.send('🚀 CRM API is running successfully.');
});

// Employee (Counselor) routes
app.use('/api/employees', employeeRoutes);

// Enquiry (Lead) routes
app.use('/api/enquiries', enquiryRoutes);

// Sync database and start the server
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connected & models synchronized.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Database sync failed:', error.message);
  });
