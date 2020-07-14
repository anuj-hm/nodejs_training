const { employees } = require("../models/sql");

class EmployeeService {
  async create(reqData) {
    return await employees.save(reqData);
  }

  async get(req, res) {
    return await employees.get(req, res);
  }

  async getAll(req, res) {
    return await employees.getAll(req, res);
  }

  async update(req ,res) {
    return await employees.update(req, res);
  }

  async delete(req, res) {
    return await employees.remove(req, res);
  }

}

module.exports = EmployeeService;