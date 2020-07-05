const { successObject } = require("api-rsp");
const { employees } = require("../models/sql");

class EmployeeService {
  async create(empData) {
    const dbData = {
      employeeNumber: empData.employeeNumber,
      firstName: empData.firstName,
      lastName: empData.lastName,
      emailId: empData.emailId,
      address: empData.address,
      city: empData.city,
      state: empData.state,
      country: empData.country,
      mobile: empData.mobile,
      age: empData.age,
    };
    const result = await employees.save(dbData);
    return successObject({ employeeId: result.employeeId });
  }

  async get(employeeId) {}

  async update(employeeId, empData) {}

  async delete(employeeId) {}

  async getAll(searchData) {}
}

module.exports = EmployeeService;
