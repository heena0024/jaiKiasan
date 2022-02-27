const customerModel = require('../models/customerModel')
const cardModel = require('../models/cardModel')

const validator = require('../validator/validator.js')

const cardCreateService = async (cardBody) => {
    try {
        
        const { cardType, customerName, vision, status, customerID } = cardBody
        const cardDatadb = await cardModel.find()
        console.log(vision)
        if (cardDatadb.length === 0) {
            var cardNumber1 = Math.floor(Math.random() * 100)
            console.log(cardNumber1, "randome")
        }
        if (cardDatadb.length != 0) {
            var cardNumberData = cardDatadb[cardDatadb.length - 1].cardNumber
            var cardNumber1 = parseInt(cardNumberData) + 1
        }

        const cardData = {
            cardNumber: cardNumber1,
            cardType: cardType,
            customerName: customerName,
            vision: vision,
            status: status,
            customerID: customerID
        }
        return cardModel.create(cardData);

    } catch (err) {
        throw new Error(err.message)
    }
}


const getCardService = async () => {
    try {
        let allCardsData = await cardModel.find().populate('customerID');
console.log(allCardsData)
        //const list = await cardModel.find()
        return allCardsData
    }
    catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { cardCreateService, getCardService }