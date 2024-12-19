const express = require('express');
require('dotenv').config();
const apiRoutes = require('./routes/api');
const phoneRoutes = require('./routes/phoneRoutes');
const ldap = require('ldapjs');

const port = process.env.PORT || 3000;

// Create LDAP server
const ldapServer = ldap.createServer();

ldapServer.listen(389, '0.0.0.0', () => {
  console.log('LDAP server listening at ldap://0.0.0.0:389');
});

const app = express();
app.use(express.json());

// Mount routes
app.use('/api', apiRoutes);
app.use('/api/phones', phoneRoutes);

// Basic health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
