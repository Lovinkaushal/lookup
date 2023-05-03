const { number, string } = require("joi");
const mongoose = require("mongoose")
const customerSchema = new mongoose.Schema({
 name: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: false,
        default: ""
    }
});
module.exports = mongoose.model('Customers', customerSchema);