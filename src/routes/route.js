const express = require('express');

const customerController = require('../controllers/customerController')
const cardController = require('../controllers/cardController')

const middlware=require('../middlewares/middleware')


const router = express.Router()
//customer API's
router.post('/createCustomer', customerController.createCustomerController)
router.post('/loginCustomer', customerController.loginCustomer)

router.get('/getCustomer', customerController.getCustomerController)
router.delete('/deleteCustomer/:customerID', customerController.deleteCustomerController)
// middlware.customerAuthmid,
//card API's
router.post('/createCard', middlware.customerAuthmid, cardController.createCardController)
router.get('/getCard', middlware.customerAuthmid, cardController.getCardController)

module.exports = router
