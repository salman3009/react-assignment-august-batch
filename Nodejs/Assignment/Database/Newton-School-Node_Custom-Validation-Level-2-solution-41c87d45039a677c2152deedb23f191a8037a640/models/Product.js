

/* Product Model */
const mongoose = require('mongoose');

/*
Add Custom Validation to Product Model
Validate that the product name is at least 3 characters long, the description is at least 10 characters long, and the price is a positive number
*/
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 3) {
                throw new Error('Product name must be at least 3 characters long')
            }
        }
    },
    description: {
        type: String,
        required: true,
        validate(value){
            if (value.length < 10) {
                throw new Error('Description must be at least 10 characters long')
            }
        }
    },
    price: {
        type: Number,
        required: true,
        validate(value){
            if (value < 0) {
                throw new Error('Price must be a positive number')
            }
        }
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;