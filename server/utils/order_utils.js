const Order = require('../models/order')
const dateUtils = require("../utils/date_utils")

function createOrder(orderInfo) {
    
    let newOrder = new Order({
        shopName : orderInfo.shopName,
        shopLogo : orderInfo.shopLogo,
        orderPrice : orderInfo.orderPrice,
        orderDate : dateUtils.format(orderInfo.orderDate),
        arrivalDate : dateUtils.format(orderInfo.arrivalDate),
        category : orderInfo.category,
        description : orderInfo.description,
        isDelivered : orderInfo.isDelivered
    })
    newOrder.save()
    return newOrder
}

module.exports = {
    createOrder
}