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
  dbData.employeeId = uuid.v4()
  return employees.create(dbData);
};

const update = async (req, res) => {
  const id = req.params.id;
  employees.update(req.body, {
    where: {
      employeeId: id
    }})
    .then(num => {
      if (num == 1) {
        return res.status(200).send({ 
          success: true ,
          message: "Employee was updated successfully."
        });
      } else {
        return res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error updating Employee with id=" + id + "======" + err
      });
    })
};

const remove = async (req, res) => {
  const id = req.params.id;
    
  employees.destroy({
    where: { employeeId: id }
  })
  .then(num => {
    if (num == 1) {
      return res.status(200).send({
          message: "Employee was deleted successfully!"
        });
    } else {
      return res.send({
        message: `Cannot delete Employee with name=${id}. Maybe Employee was not found!`
      });
    }
  })
  .catch(err => {
    return res.status(500).send({
      message: "Could not delete Employee with name=" + id + "======" + err
    });
  });
};

const get = async (req, res) => {
  const id = req.params.id;
  employees.findByPk(id)
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error retrieving Employee with id=" + id + "===== " + err
      });
    });
};

const getAll = async (req, res) => {
  employees.findAll({ where: '' })
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
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
