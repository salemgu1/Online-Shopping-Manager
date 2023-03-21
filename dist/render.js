class Renderer {
    constructor() {
      this.source = $("#signup-form").html()
      this.template = Handlebars.compile(this.source)
    }
  
    renderPage(cities) {
        $("#usersignup").empty()
        let newHtml = this.template({cities})
        $("#usersignup").append(newHtml)
    }
  }