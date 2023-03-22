const render = new Renderer()
const orderManager = new OrderApiManager()


async function saveOrder() {
    let order = await render.getInputsValues()
    if (order) {
        orderManager.createOrder(order)
        render.clearInputs()
        window.location.href = "../orders-traking/index.html"
    }
    
}


function loadOrderForm() {
    window.location.href = "./order/order_form.html"
}
