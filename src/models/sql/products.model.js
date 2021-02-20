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
  dbData.productId = uuid.v4();
  return products.create(dbData);
};

const update = async (prodId, prodBody) => {
  return await products.update(prodBody, {
    where: {
      productId: prodId
    }});
};

const remove = async (prodId) => {
  return await products.destroy({
    where: { productId: prodId }
  });
};

const get = async (prodId) => {
  return await products.findByPk(prodId);
};

const getAll = async (req, res) => {
  return await products.findAll({ where: "" });
};

module.exports = {
  save,
  update,
  remove,
  get,
  getAll,
};
