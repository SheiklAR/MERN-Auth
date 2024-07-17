//server.js

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';

const app = express();
connectDB();

// to get the data from request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Welcome to my mern auth project'));

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`port is running on ${port}`));