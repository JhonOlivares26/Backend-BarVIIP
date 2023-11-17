class IDatabase {
  create(collectionName, payload) {
    throw "Implement method";
  };
  delete(collectionName, id) {
    throw "Implement method";
  };
  update(collectionName, payload, id) {
    throw "Implement method";
  };
  getByfilter(collectionName, filter) {
    throw "Implement method";
  }
  deleteByFiter(collectionName, filter){
    throw "Implement method";
  }
  getById(collectionName,filter){
    throw "Implement method";
  }
  findAll(collectionName){
    throw "Implement method";

  }

}

module.exports = { IDatabase };
