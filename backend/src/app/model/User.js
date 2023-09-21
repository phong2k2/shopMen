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
    admin: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
},
{
    collection: 'users'
})
const User =  mongoose.model('User',UserSchema)
module.exports = User