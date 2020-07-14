const BaseSchema = require("./Base.schema");
let Joi = require("@hapi/joi");

class ProductSchema extends BaseSchema {
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
      productName: Joi.string().required().min(3).max(25)
    });
  }
}

module.exports = new ProductSchema();
