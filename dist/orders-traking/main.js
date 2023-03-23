const render = Render();
render.renderUnDeliveredOrders();
render.renderBudget()

function SignOut() {
  localStorage.removeItem('token');
  window.location.href = "../index.html";
}

function addOrder() {
  window.location.href = "../order/order_form.html";
}

$("#orders-container").on("click", ".delivered", removeElement);
function removeElement() {
  const id = $(this).closest(".order").find(".bar").data().id;
  $.ajax({ method: "PUT", url: `http://localhost:3000/order/update?id=${id}` });
  render.renderUnDeliveredOrders()
}


$("#reset").keyup(function(event) {
  if (event.keyCode === 13) {
    let newBudget = $("#reset").val()
    render.resetBudget(parseInt(newBudget))
    $("#reset").val("")
  }
});

$('.sorting').change(function(){
const sortBy = $(this).data().sort
return $.ajax({
  url: `http://localhost:3000/order/sort?sort=${sortBy}`,
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  success: function (response) {
    render.renderInSortingOrder(response)
  },
  // if there is an error in autherization we go back to login page
  error: function (res, status, error) {
    location.href = "/";
  },
});
})

let renderOrders = render.renderUnDeliveredOrders;

setInterval(renderOrders, 60000 * 60);




