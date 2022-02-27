const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: {
        type: String, required: true, trim: true
    },
    mobileNumber: {
        type: String,  required: true,unique: true
    },// 10 digits long
    DOB: {
        type: Date// default: null
    },
    emailID: {
        type: String,
        //unique: true,
        required: true,
        trim: true
    },// string abc@xyz.com
    address: {
        type: String, trim: true, required: true
    },
    customerID: {
        type: String,
        required: true
    }, //string UUID
    status: {
        type: String, enum: ["ACTIVE", "INACTIVE"],
         default: "ACTIVE"
    },// string ACTIVE / INACTIVE

}, { timestamps: true })
module.exports = mongoose.model('customer_details', customerSchema)
