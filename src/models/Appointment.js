class Users {
    constructor({ idBarber,idUser,date,hour,address}) {
      this.idBarber = idBarber;
      this.idUser = idUser;
      this.date = date;
      this.hour = hour;
      this.address = address;
    }
  
    valid() {
      if (!this.idBarber || this.idBarber?.toString().length == 0) {
        throw { status: 400, message: "The id barber is required" };
      }
      if (!this.idUser || this.idUser?.toString().length == 0) {
        throw { status: 400, message: "The id user is required" };
      }
      if (!this.date || this.date?.toString().length == 0) {
        throw { status: 400, message: "The date is required" };
      }
      if (!this.hour || this.hour?.toString().length == 0) {
        throw { status: 400, message: "The hour is required" };
      }
      if (!this.address || this.address?.toString().length == 0) {
        throw { status: 400, message: "The address is required" };
      }
    }
  
    tojson(){
      return {
        idBarber: idBarber,
        idUser: idUser,
        date: date,
        hour: hour,
        address: address
      }
    }
  
  }
  
  module.exports = Users