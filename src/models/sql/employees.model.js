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
  await employees.create(dbData);
  return { employeeId: dbData.employeeId };
};

const update = async (employeeId, dbData) => {
  const updateQuery = {};
  const {
    firstName,
    lastName,
    emailId,
    address,
    city,
    state,
    country,
    mobile,
    age,
    departmentId,
  } = dbData;
  if (firstName) updateQuery.firstName = firstName;
  if (lastName) updateQuery.lastName = lastName;
  if (emailId) updateQuery.emailId = emailId;
  if (address) updateQuery.address = address;
  if (city) updateQuery.city = city;
  if (state) updateQuery.state = state;
  if (country) updateQuery.country = country;
  if (mobile) updateQuery.mobile = mobile;
  if (age) updateQuery.age = age;
  if (departmentId) updateQuery.departmentId = departmentId;

  return await employees.update(updateQuery, {
    where: {
      employeeId: employeeId,
      isActive: true,
    },
  });
};

const remove = async (employeeId) => {
  return await employees.update(
    {
      isActive: false,
    },
    {
      where: {
        employeeId: employeeId,
        isActive: true,
      },
    }
  );
};

const get = async (employeeId) => {
  return await employees.findOne({
    where: {
      employeeId: employeeId,
      isActive: true,
    },
    raw: true,
  });
};

const getSearchQuery = (queryString) => {
  const Op = Sequelize.Op;
  return {
    [Op.or]: [
      { firstName: { [Op.iLike]: "%" + queryString + "%" } },
      { lastName: { [Op.iLike]: "%" + queryString + "%" } },
      { emailId: { [Op.iLike]: "%" + queryString + "%" } },
      { address: { [Op.iLike]: "%" + queryString + "%" } },
      { city: { [Op.iLike]: "%" + queryString + "%" } },
      { state: { [Op.iLike]: "%" + queryString + "%" } },
      { country: { [Op.iLike]: "%" + queryString + "%" } },
    ],
  };
};

const getFilterQuery = (filterReq) => {
  const Op = Sequelize.Op;
  const query = {};
  _.forEach(_.keys(filterReq), (field) => {
    if (filterReq[field]) {
      switch (field) {
        case "firstName":
        case "lastName":
        case "emailId":
        case "address":
        case "city":
        case "state":
        case "country":
          query[field] = { [Op.iLike]: "%" + filterReq[field] + "%" };
          break;
        case "createAt":
        case "updateAt":
          query[field] = Sequelize.where(
            Sequelize.fn("text", Sequelize.col(field)),
            "LIKE",
            "%" + filterReq[field] + "%"
          );
          break;
      }
    }
  });
  return query;
};

const getAll = async ({
  queryString,
  sortOrder,
  sortBy,
  offset,
  limit,
  filters,
}) => {
  let searchQuery = {};
  let filterQuery = {};

  if (queryString) {
    searchQuery = getSearchQuery(queryString);
  }
  if (filters) {
    filterQuery = getFilterQuery(filtersReq);
  }
  let mappedNames = mapDBAttributeName();
  sortBy = mappedNames.get(sortBy) || "updateAt";
  const promises = [employees.count()];
  promises.push(
    employees.findAndCountAll({
      where: {
        ...filterQuery,
        ...searchQuery,
      },
      order: [[sortBy, sortOrder]],
      offset: offset,
      limit: limit,
      subQuery: false,
    })
  );
  const [totalRecords, employeesResult] = await Promise.all(promises);
  let actualOffset = parseInt(limit) + parseInt(offset);
  const recordsFiltered = employeesResult.count;
  const nextOffset =
    actualOffset > recordsFiltered ? recordsFiltered : actualOffset;
  return {
    totalRecords,
    recordsFiltered,
    nextOffset,
    employees: employeesResult,
  };
};

module.exports = {
  save,
  update,
  remove,
  get,
  getAll,
};
