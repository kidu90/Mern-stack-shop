import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());//allows us to accept json data in the body


app.post('/api/products', async (req, res) => {
    const product = req.body; // user will send this data

    if (!product.name && !product.price && !product.image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newProduct = new Product(product)
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});



app.listen(5001, () => {
    connectDB();
    console.log('server started on http://localhost:5001');
});

