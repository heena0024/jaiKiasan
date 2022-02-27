const validator = require('./validator')
const customerModel = require('../models/customerModel')
const cardModel = require('../models/cardModel')

const createCustomerError = async ( req,res,next) => {
    try {
        const customerBody=req.body
        const { firstName, lastName, mobileNumber, DOB, emailID, address } = customerBody
        //validation starts
        if (!validator.isValidRequestBody(customerBody)) {
            return res.status(400).send({ status: false, message: "please provide valid request body" })
        }
        if (!validator.isValid(firstName)) {
            return res.status(400).send({ status: false, message: "fname is required" })
        }
        if (!validator.isValid(lastName)) {
            return res.status(400).send({ status: false, message: "fname is required" })
        }
        //mobile number
        if (!validator.isValid(mobileNumber)) {
            return res.status(400).send({ status: false, message: "phone number is required" })
        }
        //validating phone number of 10 digits only.
        if (!validator.isMobileNumber(mobileNumber)) {
            return res.status(400).send({ status: false, message: "Phone number must be a valid Indian number." })
        }
        const isMobileNumberAleadyUsed = await customerModel.findOne({ mobileNumber })
        console.log(isMobileNumberAleadyUsed,"data")
        if (isMobileNumberAleadyUsed) {
            return res.status(400).send({
                status: false,
                message: `${mobileNumber} is already in use, Please try a new phone number.`
            })
        }
      //validating email using RegEx.

        if (!validator.isValid(emailID)) {
            return res.status(400).send({ status: false, message: "email is required" })
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailID))
            return res.status(400).send({ status: false, message: "Invalid Email id." })

        const isEmailAleadyUsed = await customerModel.findOne({ emailID })
        if (isEmailAleadyUsed) {
            return res.status(400).send({
                status: false,
                message: `${emailID} is alraedy in use. Please try another email Id.`
            })
        }
        if (!validator.isValid(customerID)) {
            return res.status(400).send({ status: false, message: "cutomerId is required" })
        }
        if (!validator.isValid(address)) {
            return res.status(400).send({ status: false, message: "address is required" })
        }
        if (!validator.isValidRequestBody(address)) {
            return res.status(400).send({
                status: false,
                message: " address Required"
            })
        }
       next()
    } catch (err) {
        throw new Error(err.message)
    }
};
const createCardError = async (req, res) => {
    try {
        const customerTokenId=req.customerId
        const searchUser = await customerModel.findOne({ customerID: customerTokenId })
        console.log(customerTokenId, "customerTokenId")
        console.log(searchUser, "searchUser")
        if (searchUser != customerTokenId) {
            return  res.status(401).send({ status: false, message: `Unauthorized access! User's info doesn't match` });

        }
        }catch (err) {
            throw new Error(err.message)
        }
    };
const getCardError = async (req, res) => {
    try {
        const customerTokenId = req.customerId
        const searchUser = await cardModel.findOne({ customerID: customerTokenId })
        console.log(searchUser, "searchUser")
        if (searchUser != customerTokenId) {
            return res.status(401).send({ status: false, message: `Unauthorized access! User's info doesn't match` });

        }
    } catch (err) {
        throw new Error(err.message)
    }
};
module.exports = { createCustomerError, createCardError, getCardError};