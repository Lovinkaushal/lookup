const { number } = require("joi");
const mongoose = require("mongoose")
const businessSchema = new mongoose.Schema({
   
    
    businessName: {
        type: String,
        required: true,
        minlength: 5
    },
    ownerName:{
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        minlength: 10,
        required: true
    },
    industry: {
        type: String,
        required: true,
        minlength: 3
    },website: {
        type: String,
        required: true,
        minlength: 5
    },businessDescription: {
        name: String
    },
        address: {
            city: String,
            street: String,
            houseNumber: String
        }

    
});
module.exports = mongoose.model('business1', businessSchema);