const mongoose = require('mongoose')
const Schema = mongoose.Schema



const orderSchema = new Schema({
    userName : {type: Schema.Types.ObjectId, ref:"User"},
    shopName : String,
    shopLogo : String,
    orderPrice : Number,
    orderDate : Date,
    arrivalDate : Date,
    category : String,
    items : [String],
    isDelivered : Boolean
})


const Order = mongoose.model("Orders", orderSchema) 
module.exports = Order