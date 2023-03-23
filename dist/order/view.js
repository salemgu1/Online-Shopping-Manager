const LOGO_API = "https://api.kickfire.com/logo?website="

class Renderer {
    getInputsValues(){
        let shopname = $("#shopname").val()
            let logo = `${LOGO_API}${shopname}.com`
            let order = $.get(`${logo}`).then(() => {
                let price = $("#price").val()
                let orderDate = $("#orderDate").val()
                let arrivalDate = $("#arrivalDate").val()
                let category = $("#category").val()
                let description = $("#description").val()

                return {
                    "shopName" : shopname,
                    "shopLogo" : logo,
                    "orderPrice" : price,
                    "orderDate" : orderDate,
                    "arrivalDate" : arrivalDate,
                    "category" : category,
                    "description" : description,
                    "isDelivered" : false
                }
            }).catch(() => {
                let price = $("#price").val()
                let orderDate = $("#orderDate").val()
                let arrivalDate = $("#arrivalDate").val()
                let category = $("#category").val()
                let description = $("#description").val()
                // $(".username-error").append('<div>invalid online shop</div>')
                return {
                    "shopName" : shopname,
                    "shopLogo" : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1iwM219Lu3Kctr6ldZayZcCArF3GESXfgg491XfATCg&s',
                    "orderPrice" : price,
                    "orderDate" : orderDate,
                    "arrivalDate" : arrivalDate,
                    "category" : category,
                    "description" : description,
                    "isDelivered" : false
                }
            });

            return order
    }
    clearInputs(){
        $("#shopname").val("")
        $("#price").val("")
        $("#orderDate").val("")
        $("#arrivalDate").val("")
        $("#category").val("")
        $(".username-error").empty()
    }
}