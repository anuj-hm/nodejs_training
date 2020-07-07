const { employees } = require("../models/sql");

class EmployeeService {
  async create(reqData) {
    return await employees.save(reqData);
  }

  async get() {}

  async update() {}

  async delete() {}

  async getAll() {}
}

module.exports = EmployeeService;
