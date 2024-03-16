import express from 'express';  
import { Book } from '../models/bookModel.js';

// create express router
const router = express.Router();

// Add route to save a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send(
                { message: 'Send all required fields: title, author, publishYear',
             });
        }
        // Create a new book
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };     

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Add route to get all books
router.get('/', async (request, response) => {
    try {
        // Get all books
        const allBooks = await Book.find({});
        
        return response.status(200).json({
            count: allBooks.length,
            data: allBooks,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Add route to get a book by id
router.get('/:id', async (request, response) => {
    try {
        // Get book by id
        const { id } = request.params;
        const singleBook = await Book.findById(id);
        return response.status(200).json(singleBook);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Add route to update a book by id
router.put('/:id', async (request, response) => {
    try {
        // first check if the book exists
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send(
                { message: 'Send all required fields: title, author, publishYear',
             });
        }
        // get the book by id
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found!' });
        }
        return response.status(200).send({ message: 'Book updated successfully!' });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Add route to delete a book by id
router.delete('/:id', async (request, response) => {
    try {
        // get the book by id
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);  

        // then check if the book exists
        if (!result) {
            return response.status(404).json({ message: 'Book not found!' });
        }
        return response.status(200).send({ message: 'Book deleted successfully!' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// export router
export default router;