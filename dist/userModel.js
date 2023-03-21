class userApiManager {
    constructor() {

    }
    saveUser(user) {
        console.log("asdasdasdtyui");
        console.log(user);
        $.post('/user', user);   
    }
  }
  
  
  
  