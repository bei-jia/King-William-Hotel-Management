const pool = require("../database");
const Employee = require("../models/Employee/Employee");
const Position = require("../models/Position");
const position = new Position();

const allEmployeesView = (req, res) => {
  const criteria = req.query;
  Employee.findByCriteria(criteria)
    .then(([rows]) => {
      res.render("employee/all-employees", {
        pageTitle: "King William's - All Employees",
        pageStyle: "/css/employee/all-employees.css",
        employees: rows,
      });
    })
    .catch((err) => res.status(500).send(err));
};

const addEmployeeView = (req, res) => {
  const pageTitle = "King William's - Add Employee";
  const pageStyle = "/css/employee/add-employee.css";

  position.findAll().then((results) => {
    res.render("employee/add-employee", {
      pageTitle: pageTitle,
      pageStyle: pageStyle,
      positions: results,
    });
  });
};

const addEmployee = (req, res) => {
  const employmentType = req.body.type === "permanent" ? 1 : 0;
  const positionId = parseInt(req.body.position);

  const newEmployee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    hiredDate: req.body.hiredDate,
    street: req.body.street,
    city: req.body.city,
    country: req.body.country,
    postalCode: req.body.postalCode,
    email: req.body.email,
    phone: req.body.phone,
    employmentType: employmentType,
    positionId: positionId,
  };

  Employee.add(newEmployee)
    .then(() => res.redirect("/employee/all-employees"))
    .catch((err) => res.status(500).send(err.message));
};

const editEmployeeView = (req, res) => {
  const id = req.params.id;
  const pageTitle = "King William's - Edit Employee";
  const pageStyle = "/css/employee/edit-employee.css";

  Employee.findByCriteria({ emp_id: id })
    .then(([rows]) => {
      if (rows.length > 0) {
        position.findAll().then((results) => {
          res.render("employee/edit-employee", {
            pageTitle: pageTitle,
            pageStyle: pageStyle,
            employee: rows[0],
            isPermanent: rows[0].emp_is_permanent === 1 ? true : false,
            isTemporary: rows[0].emp_is_permanent === 0 ? true : false,
            positions: results,
          });
        });
      } else {
        res.status(404).send("Employee not found");
      }
    })
    .catch((err) => res.status(500).send(err.message));
};

const editEmployee = (req, res) => {
  const id = req.params.id;
  const employmentType = req.body.type === "permanent" ? 1 : 0;
  const positionId = parseInt(req.body.position);

  const updatedEmployee = {
    emp_fname: req.body.firstName,
    emp_lname: req.body.lastName,
    emp_hire_date: req.body.hiredDate,
    emp_street: req.body.street,
    emp_city: req.body.city,
    emp_country: req.body.country,
    emp_postal_code: req.body.postalCode,
    emp_email: req.body.email,
    emp_phone: req.body.phone,
    emp_is_permanent: employmentType,
    position_id: positionId,
  };

  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        res.status(500).send(err.message);
        return;
      }

      Employee.updateById(id, updatedEmployee, connection)
        .then(() => {
          connection.commit((err) => {
            if (err) {
              connection.rollback(() => {
                connection.release();
                res.status(500).send(err.message);
              });
            } else {
              connection.release();
              res.redirect("/employee/all-employees");
            }
          });
        })
        .catch((err) => {
          connection.rollback(() => {
            connection.release();
            res.status(500).send(err.message);
          });
        });
    });
  });
};

module.exports = {
  allEmployeesView,
  addEmployeeView,
  addEmployee,
  editEmployeeView,
  editEmployee,
};
