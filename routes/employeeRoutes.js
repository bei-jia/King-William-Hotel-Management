/*const express = require('express');
const router = express.Router();
const db = require('../path/to/your/databaseConnection'); 

router.post('/add-employee', (req, res) => {
  // Extract form data 
  const { firstName, lastName, hiredDate, street, city, country, postalCode, email, phone, type, position } = req.body;

  // Construct SQL query
  const query = `
    INSERT INTO employee (emp_fname, emp_lname, emp_hire_date, emp_street, emp_city, emp_country, emp_postal_code, emp_email, emp_phone, emp_is_permanent, position_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const isPermanent = (type === 'permanent');
  const positionId = convertPositionToId(position); 
  
  // Execute the query
  db.query(query, [firstName, lastName, hiredDate, street, city, country, postalCode, email, phone, isPermanent, positionId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while adding the employee.');
    }
    res.redirect('/employee/all-employees');
  });
});

function convertPositionToId(position) {
  // This function should convert the position string to the corresponding ID
  // Implement this based on your position table data
}

module.exports = router;
*/