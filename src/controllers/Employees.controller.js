const { sendSuccessRsp, sendErrorRsp } = require("api-rsp");

const { EmployeeSchema } = require("../validationSchema");
const { EmployeeService } = require("../services");
const empSchema = new EmployeeSchema();
const empService = new EmployeeService();

class EmployeeController {
  async create(req, res) {
    const empData = req.body;
    //validate the request data
    try {
      const { isValid, errors } = empSchema.validateApi(
        empData,
        empSchema.createSchema()
      );
      if (!isValid) {
        return sendErrorRsp(res, {
          code: "INVALID_REQUEST",
          message: "Invalid request data received",
          httpCode: 400,
          error: errors,
        });
      }
      const result = await empService.create(empData);
      return sendSuccessRsp(res, result);
    } catch (err) {
      console.error("Error in create employee :: ", err);
      return sendErrorRsp(res, {
        code: "CREATE_EMP_FAILED",
        message: "Unable to create employee failed",
        httpCode: 500,
      });
    }
  }

  async get(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}

  async getAll(req, res) {}
}

module.exports = EmployeeController;
