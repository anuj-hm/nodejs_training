/**
 * @name: EmployeeSchema.js
 * @description: Provide methods to validate employee crud operation
 * @author: Anuj Gupta
 */

const BaseSchema = require("./BaseSchema");
const Joi = require("@hapi/joi");

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
      employeeNumber: Joi.string().trim().required().min(6),
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      emailId: Joi.string().trim().required(),
      address: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      mobile: Joi.string(),
      age: Joi.number(),
    });
  }
}

module.exports = EmployeeSchema;
