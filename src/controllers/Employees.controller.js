const { EmployeeSchema } = require("../validationSchema");
const { EmployeeService } = require("../services");

const empService = new EmployeeService();

class EmployeeController {
  async create(req, res) {
    try {
      // parse the req
      const reqData = req.body;
      // const empId = req.params.empId,
      // const q = req.query
      
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

  async get(req, res) {
    try {
      //service
      const result = await empService.get(req, res);
      return result;
    } catch (err) {
      console.log(err);
      return res.send(500).send({ success: false });
    }
  }
  
  async getAll(req, res) {
    try {
      //service
      const result = await empService.getAll(req, res);
      return result;
    } catch (err) {
      console.log(err);
      return res.send(500).send({ success: false });
    }
  }

  async update(req, res) {
    try {
      // validate - JOI
      const { isValid, errors } = EmployeeSchema.validate(
        req.body,
        EmployeeSchema.createSchema()
      );
      if (!isValid) {
        return res.status(400).send({ errors });
      }

      //service
      const result = await empService.update(req, res);
      return result;

      // back the response
    } catch (err) {
      console.log(err);
      return res.send(500).send({ success: false });
    }
  }

  async delete(req, res) {
    try {
      //service
      const result = await empService.delete(req, res);
      return result;
    } catch (err) {
      console.log(err);
      return res.send(500).send({ success: false });
    }
  }
}

module.exports = EmployeeController;
