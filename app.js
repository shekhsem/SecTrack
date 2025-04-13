require('dotenv').config(); //reading .env, will place content to the process.env
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

//mongodb connection using mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server started on port: ${PORT}`)))
  .catch(err => console.error(err));