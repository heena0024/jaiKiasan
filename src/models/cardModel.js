const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    cardNumber: { 
        type: String 
    },// string Auto_increment e.g: C001
    cardType: { 
        type: String ,enum:["REGULAR","SPECIAL"]
    },//[REGULAR / SPECIAL]
    customerName: { 
        type: String,
     },
    status: {
        type: String,
        default: 'ACTIVE',
        enum: ['ACTIVE', 'INACTIVE']
    },// [ACTIVE / INACTIVE] Default: ACTIVE
    vision: { type: String },
    customerID: {
        type:String,
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'customer_details'
    },// Reference from customer
}, { timestamps: true })
module.exports = mongoose.model('Card_details', cartSchema)
