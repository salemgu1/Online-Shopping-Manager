const apiManager = new userApiManager();
// const renderer = new Renderer();


console.log($("#signup-form"));


document.getElementById("signup").addEventListener("click", goToSignup);


function goToSignup() {
    window.location.href = "./user/signup.html";
}
