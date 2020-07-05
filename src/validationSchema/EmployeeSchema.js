/**
 * @name: EmployeeSchema.js
 * @description: Provide methods to validate employee crud operation
 * @author: Anuj Gupta
 */

const BaseSchema = require("./BaseSchema");

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
    return joi.object().keys({});
  }
}

module.exports = new EmployeeSchema();
