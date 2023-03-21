const Render = function () {
  const orders = [];
  const orderApi = new OrderApiManager();
  // const orders = [
  //   {
  //     id: 0,
  //     appIcon:
  //       "https://cdn.vox-cdn.com/thumbor/b3Hilihn-dxB4aJBvIF2_KrZpoY=/0x0:1200x630/1400x1400/filters:focal(600x315:601x316)/cdn.vox-cdn.com/uploads/chorus_asset/file/22259693/download.png",
  //     days: 12,
  //     dayesPassed: 5,
  //   },
  //   {
  //     id: 1,
  //     appIcon:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9AJ4R7eyzC3EJsuZqqW90eK2tPw62l__n2vV_Yxh6g&s",
  //     days: 7,
  //     dayesPassed: 3,
  //   },
  // ];

  const getUnDeliveredOrdersFromDB = function () {
    orderApi.getUndeliveredOrders().then((result) => {
      orders = result;
    });
  };

  const renderUnDeliveredOrders = function () {
    const orderSource = $("#order").html();
    const orderTemplate = Handlebars.compile(orderSource);
    $("#orders-container").empty();
    let newElem = orderTemplate({ orders });
    $("#orders-container").append(newElem);
    colorPassedDays();
  };

  const colorPassedDays = function () {
    orders.forEach((order) => {
      let days = $(`[data-id=${order.id}]`).find(".day");
      for (let i = 0; i < order.dayesPassed; i++) {
        $(days[i]).addClass("passed");
      }
    });
  };

  return {
    renderUnDeliveredOrders,
    getUnDeliveredOrdersFromDB,
  };
};
