const customerCreateService = require('../services/customerServices')
const errValidator = require('../validator/errHandler.js')

const createCustomerController = async (req, res,next) => {
    try{
       const data= errValidator.createCustomerError(req,res)
       console.log(data,"data")
    const user = await customerCreateService.customerCreateService(req.body);
    res.status(201).send(user);
    }catch(err){
        return res.status(500).send({
            status: false,
            message: "Error is : " + err+next(err)
        })
    }
 };

 const loginCustomer=async(req,res,next)=>{
     try{
         const user = await customerCreateService.customerLoginService(req.body);
         console.log(user)
         res.status(201).send({"token":user})                                                           // send token 


     } catch (err) {
         return res.status(500).send({
             status: false,
             message: "Error is : " + err + next(err)
         })
 }
 }
const getCustomerController = async (req, res) => {
    try {
        const list = await customerCreateService.getCustomerService()
        return res.status(200).send({ status: true, message: "customer list", data: list })

    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error is : " + err + next(err)
        })
    }
}

const deleteCustomerController = async (req, res) => {
    try {
        const customerId=req.params.customerID;
        const list = await customerCreateService.deleteCustomerService(customerId)
        console.log(list)
        return res.status(204).send({ status: true, message: "customer deleted" })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error is : " + err + next(err)
        })
    }
}
module.exports = { createCustomerController, loginCustomer, getCustomerController, deleteCustomerController};