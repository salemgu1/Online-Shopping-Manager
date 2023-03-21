const render = new Renderer()
const orderManager = new OrderApiManager()


function saveOrder() {
    let order = render.getInputsValues()
    orderManager.createOrder(order)
}


function loadOrderForm() {
    window.location.href = "./order/order_form.html"
}
