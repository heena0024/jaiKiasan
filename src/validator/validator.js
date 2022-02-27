const mongoose = require('mongoose')

// Validation checking function
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false //it checks whether the value is null or undefined.
    if (typeof value === 'string' && value.trim().length === 0) return false //it checks whether the string contain only space or not 
    return true;
};
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0; // it checks, is there any key is available or not in request body
};

const isValidStatus = function (status) {
    return ['ACTIVE', 'INACTIVE'].indexOf(status) !== -1
}

//only check empty string value.
const validString = function (value) {
    if (typeof value === 'string' && value.trim().length === 0) return false //it checks whether the string contain only space or not 
    return true;
}


const validatingInvalidObjectId = function (objectId) {
    if (objectId.length == 24) return true //verifying the length of objectId -> it must be of 24 hex characters.
    return false
}

// const verifyReviewerName = function(value) {
//     if (typeof value === 'number') return false
//     return true
// }
const isMobileNumber = function (mobileNumber){
if ((/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobileNumber)))
 return true
 //res.status(400).send({ status: false, message: "Phone number must be a valid Indian number." })
}
//for order
const isValidCardTpye = function (cardTpye) {
    return ['REGULAR', 'SPECIAL'].indexOf(cardTpye) !== -1
}

module.exports = {
    isMobileNumber,
    isValid,
    isValidCardTpye,
    isValidRequestBody,
    isValidStatus,
    
    isValidObjectId,
    validString,
    validatingInvalidObjectId,
    isValidStatus
}