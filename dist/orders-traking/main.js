const render = Render();
render.renderUnDeliveredOrders();

$('#add-button').on('click', function(){
    window.location.herf = '../order/order_form.html'
})

$('#sign-out').on('click', function(){
    window.location.herf = '../index.html'
})

$('#sign-out').on('click', '.delivered', function(){
    const id = $(this).closest('.order').siblings('.bar').data()
    $(this).closest('.order').empty()
    
})