const schedule = require("node-schedule");

const render = Render();
render.renderUnDeliveredOrders();

function SignOut() {
  window.location.href = "../index.html";
}

function addOrder() {
  window.location.href = "../order/order_form.html";
}

$("#orders-container").on("click", ".delivered", removeElement);
function removeElement() {
  const id = $(this).closest(".order").find(".bar").data().id;
  $.ajax({ method: "PUT", url: `http://localhost:3000/order/update?id=${id}` });
  $(this).closest(".order").empty();
}

// run the function at midnight
const startNewDay = schedule.scheduleJob("01 00 00 * * *", function () {
  render.renderUnDeliveredOrders();
});
