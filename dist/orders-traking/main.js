const render = Render();
render.renderUnDeliveredOrders();

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

$('.sorting').change(function(){
const sortBy = $(this).data().sort
$.get(`http://localhost:3000/order/sort?sort=${sortBy}`).then(orders =>{

    render.renderInSortingOrder(orders)
})
})
let renderOrders = render.renderUnDeliveredOrders;

setInterval(renderOrders, 60000 * 60);
