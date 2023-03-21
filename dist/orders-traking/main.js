const render = Render();
render.getUnDeliveredOrdersFromDB.then(() => {
  render.renderUnDeliveredOrders();
});
