
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

  getUserAndBudget() {
    return $.ajax({
      url: `/order/budget`,
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

  resetUserBudget(newBudget) {
    return $.ajax({
      url: `/order/resetBudget`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {"budget" : newBudget},
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
