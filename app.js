const express = require('express');
const cors = require('cors');
const router = require('./src/routes/user');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

module.exports = app;