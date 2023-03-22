const Render = function () {
  orders = [];
  const orderApi = new OrderApiManager();

  const getUnDeliveredOrdersFromDB = async function () {
    orders = await orderApi.getUndeliveredOrders();
    return orders;
  };
  
  const renderUnDeliveredOrders = function () {
    getUnDeliveredOrdersFromDB().then(() => {
      const orderSource = $("#order-template").html();
      const orderTemplate = Handlebars.compile(orderSource);
      $("#orders-container").empty();
      let newElem = orderTemplate({ orders });
      $("#orders-container").append(newElem);
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
  const renderInSortingOrder = function(sortedOrders){
    
    orders = sortedOrders
    const orderSource = $("#order-template").html();
    const orderTemplate = Handlebars.compile(orderSource);
    $("#orders-container").empty();
    let newElem = orderTemplate({orders});
    $("#orders-container").append(newElem);
    colorPassedDays();
  };

  return {
    renderUnDeliveredOrders,
    renderInSortingOrder

  };

  
};
