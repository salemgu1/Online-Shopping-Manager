const apiManager = new userApiManager();


$("#signup-form").on('click', "#submit-btn", function () {
    let username = $('#username').val();
    let password = $('#password').val();
    let budget = $('#budget').val();
    let user = {
        username: username,
        password: password,
        budget: budget,
    };
    apiManager.saveUser(user) 
})