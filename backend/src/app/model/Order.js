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
            color: {type: String},
            size: {type: String},
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
        district: {type: String, required: true},
        province: {type: String, required: true},
        phone: {type: String, required: true},
    },
    payment: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    orderCode: {type: String},
    shippingPrice: {type: String, required: true},
    totalPrice: {type: Number, required: true},
    isPaid: {type: Boolean, default: false, required: true},
    paidAt: {type: Date},
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