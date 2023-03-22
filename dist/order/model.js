

class OrderApiManager {
  createOrder(order) {
    return $.ajax({
      url: "/order/create",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: order,
      success: function (response) {
        return response;
      },
      // if there is an error in autherization we go back to login page
      error: function (res, status, error) {
        location.href = "/";
      },
    });
  }
}
