class Barbers {
  constructor({name, lasName, email, password, confirmPassword}) {
    this.name = name;
    this.lasName = lasName;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
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
    if (!this.confirmPassword || this.confirmPassword?.toString().length == 0) {
      throw { status: 400, message: "The confirm password is required" };
    }
    if (this.confirmPassword !== this.password) {
      throw { status: 400, message: "The passwords are not eaqual" };
    }
  }

  tojson(){
    return {
        name : this.name,
        lasName : this.lasName,
        email : this.email,
        password : this.password,
        confirmPassword : this.confirmPassword
    }
  }
  
  }
  
  module.exports = Barbers