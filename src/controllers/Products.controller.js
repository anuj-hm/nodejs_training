
const { ProductsService } = require("../services");
const { ProductSchema } = require("../validationSchema");

const prodService = new ProductsService();

class ProductsController {
  async create(req, res) {
    try {
      // parse the req
      const reqData = req.body;
           
      // validate - JOI
      const { isValid, errors } = ProductSchema.validate(
        reqData,
        ProductSchema.createSchema()
      );
      if (!isValid) {
        return res.status(400).send({ errors });
      }

      //service
      const result = await prodService.create(reqData);

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
      const result = await prodService.get(req, res);
      return result;
    } catch (err) {
      console.log(err);
      return res.send(500).send({ success: false });
    }
  }
  
  async getAll(req, res) {
    try {
      //service
      const result = await prodService.getAll(req, res);
      return result;
    } catch (err) {
      console.log(err);
      return res.send(500).send({ success: false });
    }
  }

  async update(req, res) {
    try {
      // validate - JOI
      const { isValid, errors } = ProductSchema.validate(
        req.body,
        ProductSchema.createSchema()
      );
      if (!isValid) {
        return res.status(400).send({ errors });
      }

      //service
      const result = await prodService.update(req, res);
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
      const result = await prodService.delete(req, res);
      return result;
    } catch (err) {
      console.log(err);
      return res.send(500).send({ success: false });
    }
  }

}

module.exports = ProductsController;
