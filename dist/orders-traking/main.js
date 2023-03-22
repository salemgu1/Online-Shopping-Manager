const render = Render();
render.renderUnDeliveredOrders();



function SignOut() {
  window.location.href = "../index.html";
}

function addOrder() {
  window.location.href = "../order/order_form.html";
}
$('#orders-container').on('click', '.delivered', removeElement)
function removeElement(){
  const id = $(this).closest('.order').find('.bar').data().id
  $.ajax({method: 'PUT',
    url: `http://localhost:3000/order/update?id=${id}`})
  $(this).closest('.order').empty()
}

$('.sorting').change(function(){
const sortBy = $(this).data().sort
$.get(`http://localhost:3000/order/sort?sort=${sortBy}`).then(orders =>{

    render.renderInSortingOrder(orders)
})
})