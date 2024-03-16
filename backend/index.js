import express from 'express';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URL;
// console.log(PORT, mongoDBURL);

const app = express();

// parse JSON bodies (as sent by API clients)
app.use(express.json());

// enable all CORS requests from all origins
app.use(cors()); 

// enable CORS using custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Hello World'); 
});

// for each request to /books, use the booksRoute
app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to MongoDB!')
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });