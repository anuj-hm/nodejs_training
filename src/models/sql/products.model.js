const Sequelize = require("sequelize");
const uuid = require("uuid");
const _ = require("lodash");

const connection = require("./DbConnection");

const TABLE_NAME = "tbl_products";

const fields = {
  productId: {
    type: Sequelize.UUID,
    field: "product_id",
    primaryKey: true,
    allowNull: false,
  },
  productName: {
    type: Sequelize.STRING(25),
    field: "product_name",
  }
};

const tableOptions = {
  freezeTableName: true,
  tableName: TABLE_NAME,
  timestamps: true,
  id: false,
  createdAt: "utc_created_at",
  updatedAt: "utc_updated_at",
};

const products = connection.define(TABLE_NAME, fields, tableOptions);

const save = async (dbData) => {
  dbData.productId = uuid.v4()
  return products.create(dbData);
};

const update = async (req, res) => {
  const id = req.params.id;
  products.update(req.body, {
    where: {
      productId: id
    }})
    .then(num => {
      if (num == 1) {
        return res.status(200).send({ 
          success: true ,
          message: "Product was updated successfully."
        });
      } else {
        return res.send({
          message: `Cannot update Product with id=${id}. Maybe product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error updating Product with id=" + id + "======" + err
      });
    })
};

const remove = async (req, res) => {
  const id = req.params.id;
    
  products.destroy({
    where: { productId: id }
  })
  .then(num => {
    if (num == 1) {
      return res.status(200).send({
          message: "Product was deleted successfully!"
        });
    } else {
      return res.send({
        message: `Cannot delete Product with name=${id}. Maybe Product was not found!`
      });
    }
  })
  .catch(err => {
    return res.status(500).send({
      message: "Could not delete Product with name=" + id + "======" + err
    });
  });
};

const get = async (req, res) => {
  const id = req.params.id;
  products.findByPk(id)
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error retrieving product with id=" + id
      });
    });
};

const getAll = async (req, res) => {
  products.findAll({ where: '' })
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

module.exports = {
  save,
  update,
  remove,
  get,
  getAll,
};
