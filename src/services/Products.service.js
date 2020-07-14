const { products } = require("../models/sql");

class ProductService {
  async create(reqData) {
    return await products.save(reqData);
  }

  async get(req, res) {
    return await products.get(req, res);
  }

  async getAll(req, res) {
    return await products.getAll(req, res);
  }

  async update(req ,res) {
    return await products.update(req, res);
  }

  async delete(req, res) {
    return await products.remove(req, res);
  }

}

module.exports = ProductService;