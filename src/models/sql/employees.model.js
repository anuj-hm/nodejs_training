const Sequelize = require("sequelize");
const uuid = require("uuid");
const _ = require("lodash");

const connection = require("./DbConnection");

const TABLE_NAME = "tbl_employees";

const fields = {
  employeeId: {
    type: Sequelize.UUID,
    field: "employee_id",
    primaryKey: true,
    allowNull: false,
  },
  employeeNumber: {
    type: Sequelize.STRING(10),
    field: "employee_number",
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING(25),
    field: "first_name",
  },
  lastName: {
    type: Sequelize.STRING(25),
    field: "last_name",
  },
  emailId: {
    type: Sequelize.STRING(50),
    field: "email_id",
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING(100),
    field: "address",
  },
  city: {
    type: Sequelize.STRING(25),
    field: "city",
  },
  state: {
    type: Sequelize.STRING(25),
    field: "state",
  },
  country: {
    type: Sequelize.STRING(25),
    field: "country",
  },
  mobile: {
    type: Sequelize.STRING(15),
    field: "mobile",
  },
  age: {
    type: Sequelize.SMALLINT,
    field: "age",
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    field: "is_active",
    defaultValue: true,
    allowNull: false,
  },
  departmentId: {
    type: Sequelize.UUID,
    field: "department_id",
  },
};

const tableOptions = {
  freezeTableName: true,
  tableName: TABLE_NAME,
  timestamps: true,
  id: false,
  createdAt: "utc_created_at",
  updatedAt: "utc_updated_at",
};

const employees = connection.define(TABLE_NAME, fields, tableOptions);

const save = async (dbData) => {
  dbData.employeeId = uuid.v4();
  return employees.create(dbData);
};

const update = async (empId, empBody) => {
  return await employees.update(empBody, {
    where: {
      employeeId: empId
    }});
};

const remove = async (empId) => {
  return await employees.destroy({
    where: { employeeId: empId }
  });
};

const get = async (empId) => {
  return await employees.findByPk(empId);
};

const getAll = async () => {
  return await employees.findAll({ where: "" });
};

module.exports = {
  save,
  update,
  remove,
  get,
  getAll,
};
