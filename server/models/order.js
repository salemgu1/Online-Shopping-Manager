const mongoose = require('mongoose')
const Schema = mongoose.Schema



const orderSchema = new Schema({
    shopName : String,
    shopLogo : String,
    orderPrice : Number,
    orderDate : Date,
    arrivalDate : Date,
    category : String,
    description : String,
    isDelivered : Boolean
})


const Order = mongoose.model("Orders", orderSchema) 
module.exports = Order