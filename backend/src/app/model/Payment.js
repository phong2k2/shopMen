const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PaymentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['active','inactive'],
        default: 'active',
    }
},{
    timestamps: true,
})


const Payment =  mongoose.model('Payment',PaymentSchema)
module.exports = Payment