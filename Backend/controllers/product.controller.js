import express from 'express';
import Product from '../models/product.model.js';

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in geting all the products", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const createProduct = async (req, res) => {
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

}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log("Error in updating the products", error);
        res.status(404).json({ success: false, message: 'Product not found' });

    }
}

export const deleteProduct = async (req, res) => {

    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.log("Error in deleting the products", error);
        res.status(404).json({ success: false, message: 'Product not found' });
    }
}