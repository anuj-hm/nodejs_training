const { EmployeeSchema } = require("../validationSchema");
const { EmployeeService } = require("../services");

const empService = new EmployeeService();

class EmployeeController {
  async create(req, res) {
    try {
      // parse the req
      const reqData = req.body;

      // validate - JOI
      const { isValid, errors } = EmployeeSchema.validate(
        reqData,
        EmployeeSchema.createSchema()
      );
      if (!isValid) {
        return res.status(400).send({ errors });
      }

      //service
      const result = await empService.create(reqData);

      return res.status(200).send({ success: true });

      // back the response
    } catch (err) {
      console.log(err);
      return res.send(500).send({ success: false });
    }
  }

  async get(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}

  async getAll(req, res) {}
}

module.exports = EmployeeController;
