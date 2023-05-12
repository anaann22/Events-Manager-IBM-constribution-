import express from 'express';
import checkAuth from './utils/checkAuth.js';
import { registerValidation } from './validations/auth.js';
import mongoose from 'mongoose';
import * as UserController from './controllers/UserController.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));

// Routes
app.post('/auth/login', UserController.login);
app.post('/auth/register', UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// Start server
const port = process.env.PORT || 4444;
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server running on port ${port}`);
});

// Dependencies
// npm install express-validator - validate user input
// npm install jsonwebtoken - transmit objects as tokens
// npm install bcrypt - encrypt passwords
