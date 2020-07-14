/**
 * @name: EmployeeSchema.js
 * @description: Provide methods to validate employee crud operation
 * @author: Anuj Gupta
 */

const BaseSchema = require("./Base.schema");
let Joi = require("@hapi/joi");

class EmployeeSchema extends BaseSchema {
  /**
   * Which is used to validate the api request object structure based on the defined schema
   * @param  {object} obj - request object
   * @return {object} {isValid : true | false, errors: [] }
   */
  validateApi(obj, schema) {
    return this.validate(obj, schema);
  }

  createSchema() {
    return Joi.object().keys({
      employeeNumber: Joi.string().required().min(3).max(10),
      firstName: Joi.string().required().min(3).max(25),
      lastName: Joi.string().required().min(3).max(25),
      emailId: Joi.string().required().min(3).max(50),
      address: Joi.string().max(100),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      mobile: Joi.string()
    });
  }
}

module.exports = new EmployeeSchema();
