// const ordersData = require('./ordersMockdata.json')
// const usersData = require('./usersMockdata.json')
// const mongoose = require('mongoose')
// mongoose
//   .connect("mongodb+srv://abdallahabukhdair:3A8o3Xa9isjMTmzd@cluster0.uvh8ikk.mongodb.net/?retryWrites=true&w=majority")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => console.log("cant Connected to MongoDB", error));
// const Schema = mongoose.Schema

// const orderSchema = new Schema({
//     shopName : String,
//     shopLogo : String,
//     orderPrice : Number,
//     orderDate : String,
//     arrivalDate : String,
//     category : String,
//     items : [String],
//     isDelivered : Boolean
// })

// const userSchema = new mongoose.Schema({
//     username: String,
//     password: String, 
//     budget: Number,
//     orders: [{type: Schema.Types.ObjectId, ref: "Order"}]
//   });
  
// const User = mongoose.model("User", userSchema);
// const Order = mongoose.model("Order", orderSchema) 

// const u1 = new User(usersData[0])
// const u2 = new User(usersData[1])
// const u3 = new User(usersData[2])
// const u4 = new User(usersData[3])
// const u5 = new User(usersData[4])

// const o1 = new Order(ordersData[0])
// const o2 = new Order(ordersData[1])
// const o3 = new Order(ordersData[2])
// const o4 = new Order(ordersData[3])
// const o5 = new Order(ordersData[4])
// const o6 = new Order(ordersData[5])
// const o7 = new Order(ordersData[6])
// const allOrders = [o1,o2,o3,o4,o5,o6,o7]
// allOrders.forEach(o => o.save())

// u1.orders.push(o1)
// u1.orders.push(o2)
// u1.orders.push(o3)
// u2.orders.push(o2)
// u2.orders.push(o4)
// u2.orders.push(o5)
// u2.orders.push(o6)
// u3.orders.push(o1)
// u3.orders.push(o3)
// u4.orders.push(o5)
// u4.orders.push(o7)
// u5.orders.push(o4)
// u5.orders.push(o6)
// u5.orders.push(o7)


// u1.save()
// u2.save()
// u3.save()
// u4.save()
// u5.save()




