const LOGO_API = "https://api.kickfire.com/logo?website="

class Renderer {
    getInputsValues(){
        let shopname = $("#shopname").val()
        let logo = `${LOGO_API}${shopname}.com`
        let price = $("#price").val()
        let orderDate = $("#orderDate").val()
        let arrivalDate = $("#arrivalDate").val()
        let category = $("#category").val()

        return {
            "shopName" : shopname,
            "shopLogo" : logo,
            "orderPrice" : price,
            "orderDate" : orderDate,
            "arrivalDate" : arrivalDate,
            "category" : category,
            "items" : ["shirt","jacket"],
            "isDelivered" : false
        }

    }
    clearInputs(){
        $("#shopname").val("")
        $("#price").val("")
        $("#orderDate").val("")
        $("#arrivalDate").val("")
        $("#category").val("")
    }
}