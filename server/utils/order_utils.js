const Order = require('../models/order')
const dateUtils = require("../utils/date_utils")

function createOrder(user,orderInfo) {
    let newOrder = new Order({
        userName : user,
        shopName : orderInfo.shopName,
        shopLogo : orderInfo.shopLogo,
        orderPrice : orderInfo.orderPrice,
        orderDate : dateUtils.format(orderInfo.orderDate),
        arrivalDate : dateUtils.format(orderInfo.arrivalDate),
        category : orderInfo.category,
        items : orderInfo.items,
        isDelivered : orderInfo.isDelivered
    })

    newOrder.save()
    return newOrder
}

module.exports = {
    createOrder
}