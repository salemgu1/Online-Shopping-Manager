
class OrderApiManager {
  getUndeliveredOrders() {
    return $.ajax({
      url: `/order/undeliverd`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
