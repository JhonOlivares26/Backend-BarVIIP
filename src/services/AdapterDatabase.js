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

  }
}

module.exports = { IDatabase };
