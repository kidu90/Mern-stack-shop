import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true //this will automatically create a timestamp(the date and time of a particular event) when the product is created
});

const Product = mongoose.model('Product', productSchema);

export default Product;
