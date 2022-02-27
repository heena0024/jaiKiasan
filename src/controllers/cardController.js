const cardCreateService = require('../services/cardService')
const validator = require('../validator/errHandler.js')
const cardModel=require('../models/cardModel')

const createCardController = async (req, res,next) => {
    try {
        //const errorHandle = await validator.createCardError(req,res)
        const card = await cardCreateService.cardCreateService(req.body);
        res.status(201).send(card);
        next()
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error is : " + err+next(err)
        })
    }
}
const getCardController  = async (req, res, next) => {
    try {
        const card = await cardCreateService.getCardService(req.body);
        res.status(201).send(card);
        next()
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error is : " + err+next(err)
        })
    }
}
module.exports = { createCardController, getCardController }