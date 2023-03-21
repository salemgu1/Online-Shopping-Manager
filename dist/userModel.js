class userApiManager {
  constructor() {}
  saveUser(user) {
    $.post("/user", user)
      .then((result) => {
        alert("user added successfuly");
      })
      .catch((error) => {
        alert("invalid username")
      });
  }
}
