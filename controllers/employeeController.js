
const Employee = require('../models/Employee/Employee'); 

const allEmployeesView = (req, res) => {
  const criteria = req.query;
  Employee.findByCriteria(criteria)
    .then(([rows]) => {
      res.render("employee/all-employees", {
        pageTitle: "King William's - All Employees",
        pageStyle: "/css/employee/all-employees.css",
        employees: rows
      });
    })
    .catch(err => res.status(500).send(err));
};

const addEmployeeView = (req, res) => {
  const pageTitle = "King William's - Add Employee";
  const pageStyle = "/css/employee/add-employee.css";
  res.render("employee/add-employee", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

const addEmployee = (req, res) => {
  
  const employmentType = req.body.type === 'permanent' ? 1 : 0;
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
    positionId: positionId
  };

  Employee.add(newEmployee)
    .then(() => res.redirect('/employee/all-employees'))
    .catch(err => res.status(500).send(err.message));
};

module.exports = { allEmployeesView, addEmployeeView, addEmployee };