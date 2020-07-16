const { products } = require("../models/sql");

class ProductService {
  async create(reqData) {
    return await products.save(reqData);
  }

  async get(prodId) {
    return await products.get(prodId);
  }

  async getAll() {
    return await products.getAll();
  }

  async update(prodId, prodBody) {
    return await products.update(prodId, prodBody);
  }

  async delete(prodId) {
    return await products.remove(prodId);
  }

}

module.exports = ProductService;