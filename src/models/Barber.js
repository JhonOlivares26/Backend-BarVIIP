class Barbers {
    constructor({name, lasName, email, password, confiPassword}) {
      this.name = name;
      this.lasName = lasName;
      this.email = email;
      this.password = password;
      this.confiPassword = confiPassword;
    }
  
    valid() {
      if (!this.name || this.name?.toString().length == 0) {
        throw { status: 400, message: "The name is required" };
      }
      if (!this.lasName || this.lasName?.toString().length == 0) {
        throw { status: 400, message: "The last name is required" };
      }
      if (!this.email || this.email?.toString().length == 0) {
        throw { status: 400, message: "The email is required" };
      }
      if (!this.password || this.password?.toString().length == 0) {
        throw { status: 400, message: "The password is required" };
      }
      if (!this.confiPassword || this.confiPassword?.toString().length == 0) {
        throw { status: 400, message: "The confi password is required" };
      }
    }
  
    tojson(){
      return {
          name : this.name,
          lasName : this.lasName,
          email : this.email,
          password : this.password,
          confiPassword : this.confiPassword
      }
    }
  
  }
  
  module.exports = Barbers