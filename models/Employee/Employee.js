
const pool = require('../../database');

class Employee {
    static add(newEmployee) {
      return new Promise((resolve, reject) => {
        const query = `
          INSERT INTO employee (
            emp_fname, emp_lname, emp_hire_date, emp_street, emp_city, emp_country,
            emp_postal_code, emp_email, emp_phone, emp_is_permanent, position_id
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        // Prepare the values to be inserted, including converting employment type to boolean
        const values = [
          newEmployee.firstName,
          newEmployee.lastName,
          newEmployee.hiredDate,
          newEmployee.street,
          newEmployee.city,
          newEmployee.country,
          newEmployee.postalCode,
          newEmployee.email,
          newEmployee.phone,
          newEmployee.employmentType === 'permanent' ? 1 : 0,
          newEmployee.positionId
        ];

        pool.query(query, values, (err, results) => {
          if (err) reject(err);
          else resolve(results.insertId); // assuming you might want the inserted employee's ID
        }        
        );
        
      });
    }

    static findByCriteria(criteria) {
      let query = "SELECT * FROM employee";
      let conditions = [];
      let values = [];
  
      Object.keys(criteria).forEach(key => {
        if (criteria[key]) {
          conditions.push(`${key} = ?`);
          values.push(criteria[key]);
        }
      });
  
      if (conditions.length) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
  
      return pool.promise().query(query, values);
    }
    static findById(id) {
      return pool.promise().query("SELECT * FROM employee WHERE emp_id = ?", [id]);
    }
}

module.exports = Employee;