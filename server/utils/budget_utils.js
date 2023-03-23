const User = require("../models/user");


async function budgetDecrement(user,order) {
    let userName = user.username
    let newBudget = user.budget
    newBudget -= order.orderPrice
    
    let userData = await User.findOneAndUpdate(
        { username: userName },
        { budget: newBudget  },
        { new: true }
    );
}


module.exports = {
    budgetDecrement
}