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
    console.log(user);
    apiManager.saveUser(user)
    clearInputs()
})

function clearInputs(){
    $('#username').val("");
    $('#password').val("");
    $('#budget').val("");
}


// Get the form and submit button elements
const loginForm = document.querySelector("#login-form");
const loginBtn = document.querySelector("#login-btn");

// Add an event listener for the form submit event
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = $("#uname").val();
  const password =$("#psw").val();
  console.log(password);

  $.ajax({
    url: "/login",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({ username, password }),
    success: function (data) {
      localStorage.setItem("token", data.accessToken);
      window.location.href = "../orders-traking/index.html";
    },
    error: function (error, textStatus, errorThrown) {
      if (error.status === 401) {
        console.log("Unauthorized error:", errorThrown);
      } else {
        console.log("Request failed:", errorThrown);
      }
    },
  });
});
