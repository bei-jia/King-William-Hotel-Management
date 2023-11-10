const allEmployeesView = (req, res) => {
  const pageTitle = "King William's - All Employees";
  const pageStyle = "/css/employee/all-employees.css";
  res.render("employee/all-employees", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

const addEmployeeView = (req, res) => {
  const pageTitle = "King William's - Add Employee";
  const pageStyle = "/css/employee/add-employee.css";
  res.render("employee/add-employee", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { allEmployeesView, addEmployeeView };
