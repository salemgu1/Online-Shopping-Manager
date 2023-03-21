class OrderApiManager {
  getUndeliveredOrders() {
    return $.get("/order/undeliverd").then((orders) => {
      return orders;
    });
  }
}
