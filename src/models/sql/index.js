const db = {
    connection: require("./DbConnection"),
    employees: require("./employees.model"),
    products: require("./products.model")
};
  
module.exports = db;
  