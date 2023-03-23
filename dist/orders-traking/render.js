const Render = function () {
  orders = [];
  let username = "";
  const orderApi = new OrderApiManager();

  const getUnDeliveredOrdersFromDB = async function () {
    userAndOrders = await orderApi.getUndeliveredOrders();
    username = userAndOrders.username;
    orders = userAndOrders.orders;
    return userAndOrders;
  };

  const resetBudget = async function(newBudget){
    orderApi.resetUserBudget(newBudget)
    
    
};


  const renderBudget = async function(){
    let userAndBudget = await orderApi.getUserAndBudget();
    let budget = userAndBudget.budget
    const source = $('#budget-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template({'Budget' : budget});
    $("#budget").append(newHTML)
};

  const renderUserName = function () {
    const userSource = $("#user-template").html();
    const userTemplate = Handlebars.compile(userSource);
    $("#wellcome-user").empty();
    let newElem = userTemplate({ username });
    $("#wellcome-user").append(newElem);
  };

  const renderUnDeliveredOrders = function () {
    getUnDeliveredOrdersFromDB().then(() => {
      const orderSource = $("#order-template").html();
      const orderTemplate = Handlebars.compile(orderSource);
      $("#orders-container").empty();
      let newElem = orderTemplate({ orders });
      $("#orders-container").append(newElem);
      renderUserName();
      colorPassedDays();
    });
  };

  const colorPassedDays = function () {
    orders.forEach((order) => {
      let days = $(`[data-id=${order.id}]`).find(".day");
      for (let i = 0; i < order.dayesPassed; i++) {
        $(days[i]).addClass("passed");
      }
    });
  };
  const renderInSortingOrder = function (sortedOrders) {
    orders = sortedOrders;
    const orderSource = $("#order-template").html();
    const orderTemplate = Handlebars.compile(orderSource);
    $("#orders-container").empty();
    let newElem = orderTemplate({ orders });
    $("#orders-container").append(newElem);
    colorPassedDays();
  };


  



  return {
    renderUnDeliveredOrders,
    renderInSortingOrder,
    renderBudget,
    resetBudget
  };
};
