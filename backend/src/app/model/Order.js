const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderItems: [
        {
            name: {type: String,required: true},
            amount: {type: Number,required: true}, 
            price: {type: Number,required: true},
            image: { type: String, required: true },
            discount: { type: Number },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        },
    ],
    shippingAddress: {
        fullName: {type: String, required: true},
        address: {type: String, required: true},
        email: {type: String, required: true},
        city: {type: String, required: true},
        phone: {type: Number, required: true},
    },
    orderCode: {type: String, required: true},
    shippingPrice: {type: String, required: true},
    totalPrice: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: {
        type: String, 
        enum: ['processing', 'confirmed', 'shipped', 'complete', 'cancelled'],
        default: 'processing'
    },    
},{
    timestamps: true,
})
const Order =  mongoose.model('Order',OrderSchema)
module.exports = Order