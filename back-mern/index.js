import express from 'express';
import multer from 'multer';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import {registerValidation, loginValidation, postCreateValidation, eventValidation} from './validations.js';
import mongoose from 'mongoose';
import { PostController, UserController, EventController } from './controllers/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
import {EventController} from './controllers/index.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));

// Routes
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/event/create',eventValidation, EventController.create);
app.get('/utilizatori', UserController.getAll);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

app.post('/event/create', eventValidation, EventController.create);

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
