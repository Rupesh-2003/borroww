const mongoose = require("mongoose")

const Schema = mongoose.Schema

const Borrow = new Schema({
    name: {
        type: 'string',
        required: true
    },
    gender: {
        type: 'string',
        required: true
    },
    mobileNumber: {
        type: 'string',
        required: true
    },
    borrowRequests: [{
        type: "Object",
        required: true
    }],
    otp: {
        type: 'Number',
        required: false
    }
})

module.exports = mongoose.model("Borrow", Borrow)