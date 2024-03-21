const express = require('express');
const cors = require('cors');
const userRouter = require('./src/routes/user');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);

const port = process.env.PORT || '4568';
app.listen(port, () => console.log(`Server running or port ${port}`));