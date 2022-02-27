
const customerModel = require('../models/customerModel')
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');

const validator = require('../validator/validator.js')

const customerCreateService = async (customerBody) => {
    try{
    const { firstName, lastName, mobileNumber, DOB, emailID, address,  status } = customerBody

    const uuid=uuidv4();
    const cunstomerData={
firstName:firstName, 
        lastName: lastName, 
        mobileNumber: mobileNumber, 
    DOB:DOB, 
        emailID: emailID, 
        address: address, 
        customerID: uuid, 
    status :status
    }
        return customerModel.create(cunstomerData);

}catch(err){
        throw new Error(err.message)
    }
}

const customerLoginService=async(loginBody)=>{
    try{
        const { emailID, password } = loginBody;
        if (emailID && password) {
            const customer = await customerModel.findOneAndUpdate({ emailID },{status:"Active"});
console.log(customer,"customer")
            if (customer) {
                const Token = jwt.sign({ customerId: customer._id }, "jai-kisan")  
                return Token                               
            }
        }
    }
catch (err) {
    throw new Error(err.message)

}
}
const getCustomerService = async () => {
    try {
       const list = await customerModel.find({ status: "ACTIVE" })
        return list
    }
    catch (err) {
        throw new Error(err.message)
    }
}
const deleteCustomerService = async (customerId) => {
    try {
        const list = await customerModel.findOneAndUpdate({ customerID: customerId }, { $set: { status: "INACTIVE" } })

        //const list = await customerModel.findOneAndDelete({ customerID: customerId})
        return   list  
}
    catch (err) {
        throw new Error(err.message)
    }
}
    module.exports = { customerCreateService, customerLoginService, getCustomerService, deleteCustomerService}
 