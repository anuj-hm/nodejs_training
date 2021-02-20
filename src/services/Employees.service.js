const { employees } = require("../models/sql");

class EmployeeService {
  async create(reqData) {
    return await employees.save(reqData);
  }

  async get(empId) {
    return await employees.get(empId);
  }

  async getAll() {
    return await employees.getAll();
  }

  async update(empId, empBody) {
    return await employees.update(empId, empBody);
  }

  async delete(empId) {
    return await employees.remove(empId);
  }

}

module.exports = EmployeeService;