const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    status: {
        type: Number,
        default: 0,
    },
    role: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true,
},
{
    collection: 'users'
})
const User =  mongoose.model('User',UserSchema)
module.exports = User