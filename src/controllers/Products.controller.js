const apiRsp = require("api-rsp");

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

      // return res.status(200).send({ success: true });
      return apiRsp.sendSuccessRsp(res);

      // back the response
    } catch (err) {
      console.log(err);
      // return res.send(500).send({ success: false });
      apiRsp.sendErrorRsp(res);
    }
  }

  async get(req, res) {
    const prodId = req.params.id;
    try {
      //service
      const result = await prodService.get(prodId);
      if(result) {
        return res.status(200).send({
          data: result,
          message: `Product was retrieved successfully! ${prodId}`
        });
      } else {
        return res.send({
          message: `Error retrieving Product with id= ${prodId} ${result}`
        });
      }
    } catch (err) {
      return res.status(500).send({ success: false , message : err});
    }
  }
  
  async getAll(req, res) {
    try {
      //service
      const result = await prodService.getAll();
      if(result) {
        return res.status(200).send({
          data:result,
          message: `Products data was retrieved successfully!`
        });
      } else {
        return res.send({
          message: `Error retrieving Products ${result}`
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
      const { isValid, errors } = ProductSchema.validate(
        req.body,
        ProductSchema.createSchema()
      );
      if (!isValid) {
        return res.status(400).send({ errors });
      }

      //service
      const prodId = req.params.id;
      const prodBody = req.body;
      const result = await prodService.update(prodId, prodBody);
      if (result == 1) {
        return res.status(200).send({ 
          success: true ,
          message: "Product was updated successfully."
        });
      } else {
        return res.send({
          message: `Cannot update Product with id=${prodId}. Maybe Product was not found or req.body is empty!`
        });
      }
    } catch (err) {
      return res.send(500).send({ 
        success: false,
        message: "Error updating Product with id=" + prodId + "======" + err
      });
    }
  }

  async delete(req, res) {
    const prodId = req.params.id;
    try {
      //service
      const result = await prodService.delete(prodId);
      if(result == 1) {
        return res.status(200).send({
          message: `Product was deleted successfully! ${prodId}`
        });
      } else {
        return res.send({
          message: `Cannot delete Product with name=${prodId}. Maybe Product was not found! ${result}`
        });
      }
    } catch (err) {
      return res.status(500).send({ success: false , message : err});
    }
  }

}

module.exports = ProductsController;
