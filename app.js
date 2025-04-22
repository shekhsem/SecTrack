import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import statusRoutes from './routes/statusRoutes.js';
import assetRoutes from './routes/assetRoutes.js';
dotenv.config(); // reading .env, will place content to the process.env

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());

// mongodb connection using mongoose
mongoose.connect(MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)))
  .catch(err => console.error(err));

app.use('/status', statusRoutes);
app.use('/asset', assetRoutes);