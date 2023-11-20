
const Employee = require('../models/Employee/Employee'); 
/*
const allEmployeesView = (req, res) => {
  const pageTitle = "King William's - All Employees";
  const pageStyle = "/css/employee/all-employees.css";
  res.render("employee/all-employees", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};
*/

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
  // Parse the position to an integer and map the employment type to the correct database value
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


/*
const searchEmployees = async (req, res) => {
  try {
    // Extract the query parameters
    const { employeeID, firstName, lastName, hiredDate } = req.query;

    let employees;

    // Call the appropriate method based on the provided query parameters
    if (employeeID) {
      employees = await Employee.getById(employeeID);
    } else if (firstName) {
      employees = await Employee.getByFirstName(firstName);
    } else if (lastName) {
      employees = await Employee.getByLastName(lastName);
    } else if (hiredDate) {
      employees = await Employee.getByHiredDate(hiredDate);
    } else {
      employees = await Employee.getAll();
    }

    // Assuming the query methods return an array of employees
    // You may need to adjust this if they return an object with a results property, etc.
    res.render('employee/all-employees', {
      employees: employees[0] // Assuming the results are in the first element of the returned array
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
*/
/*
const searchEmployees = (req, res) => {
  // Extract search parameters from the query string
  const searchParams = {
    emp_id: req.query.employeeID,
    emp_fname: req.query.firstName,
    emp_lname: req.query.lastName,
    emp_hire_date: req.query.hiredDate,
    emp_phone: req.query.phone,
    emp_email: req.query.email,
    emp_street: req.query.street,
    emp_city: req.query.city,
    emp_country: req.query.country,
    emp_postal_code: req.query.postalCode,
    emp_is_permanent: req.query.isPermanent === 'true' ? 1 : req.query.isPermanent === 'false' ? 0 : undefined, // Convert to 1 or 0 if necessary
    position_id: req.query.position
  };
  */



module.exports = { allEmployeesView, addEmployeeView, addEmployee };