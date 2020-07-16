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
    const empId = req.params.id;
    try {
      //service
      const result = await empService.get(empId);
      if(result) {
        return res.status(200).send({
          data: result,
          message: `Employee was retrieved successfully! ${empId}`
        });
      } else {
        return res.send({
          message: `Error retrieving Employee with id= ${empId} ${result}`
        });
      }
    } catch (err) {
      return res.status(500).send({ success: false , message : err});
    }
  }

  
  async getAll(req, res) {
    try {
      //service
      const result = await empService.getAll();
      if(result) {
        return res.status(200).send({
          data:result,
          message: `Employees data was retrieved successfully!`
        });
      } else {
        return res.send({
          message: `Error retrieving Employees ${result}`
        });
      }
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
      const empId = req.params.id;
      const empBody = req.body;
      const result = await empService.update(empId, empBody);
      if (result == 1) {
        return res.status(200).send({ 
          success: true ,
          message: "Employee was updated successfully."
        });
      } else {
        return res.send({
          message: `Cannot update Employee with id=${empId}. Maybe Employee was not found or req.body is empty!`
        });
      }
    } catch (err) {
      return res.send(500).send({ 
        success: false,
        message: "Error updating Employee with id=" + empId + "======" + err
      });
    }
  }

  async delete(req, res) {
    const empId = req.params.id;
    try {
      //service
      const result = await empService.delete(empId);
      if(result == 1) {
        return res.status(200).send({
          message: `Employee was deleted successfully! ${empId}`
        });
      } else {
        return res.send({
          message: `Cannot delete Employee with name=${empId}. Maybe Employee was not found! ${result}`
        });
      }
    } catch (err) {
      return res.status(500).send({ success: false , message : err});
    }
  }
}

module.exports = EmployeeController;
