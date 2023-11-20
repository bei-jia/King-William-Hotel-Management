//const db = require('../../database');
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
        /*
        pool.query(query, values)
        .then(results => resolve(results.insertId)) // Use then() to handle the promise
        .catch(err => reject(err));
        */
        db.query(query, values, (err, results) => {
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

    /*
    static getAll() {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM employee
            `;
            db.query(query, (err, results) => {
            if (err) reject(err);
            else resolve(results);
            });
        });
    }
    static getById(employeeId) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM employee WHERE emp_id = ?
            `;
            db.query(query, [employeeId], (err, results) => {
            if (err) reject(err);
            else resolve(results);
            });
        });
    }
    static getByFirstName(firstName) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM employee WHERE emp_fname = ?
            `;
            db.query(query, [firstName], (err, results) => {
            if (err) reject(err);
            else resolve(results);
            });
        });
    }
    static getByLastName(lastName) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM employee WHERE emp_lname = ?
            `;
            db.query(query, [lastName], (err, results) => {
            if (err) reject(err);
            else resolve(results);
            });
        });
    }
    static getByHiredDate(hiredDate) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM employee WHERE emp_hire_date = ?
            `;
            db.query(query, [hiredDate], (err, results) => {
            if (err) reject(err);
            else resolve(results);
            });
        });
    }
    static getByStreet(street) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM employee WHERE emp_street = ?
            `;
            db.query(query, [street], (err, results) => {
            if (err) reject(err);
            else resolve(results);
            });
        });
    }
    static getByCity(city) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT * FROM employee WHERE emp_city = ?
            `;
            db.query(query, [city], (err, results) => {
            if (err) reject(err);
            else resolve(results);
            });
        });
    }
    */

    /*
    static searchByParams(params) {
        return new Promise((resolve, reject) => {
          let query = 'SELECT * FROM employee WHERE 1=1';
          const queryValues = [];
    
          // Add conditions for each parameter
          if (params.employeeID) {
            query += ' AND emp_id = ?';
            queryValues.push(params.employeeID);
          }
          if (params.firstName) {
            query += ' AND emp_fname LIKE ?';
            queryValues.push(`%${params.firstName}%`);
          }
          if (params.lastName) {
            query += ' AND emp_lname LIKE ?';
            queryValues.push(`%${params.lastName}%`);
          }
          if (params.hiredDate) {
            query += ' AND emp_hire_date = ?';
            queryValues.push(params.hiredDate);
          }
          if (params.street) {
            query += ' AND emp_street LIKE ?';
            queryValues.push(`%${params.street}%`);
          }
          if (params.city) {
            query += ' AND emp_city LIKE ?';
            queryValues.push(`%${params.city}%`);
          }
          if (params.country) {
            query += ' AND emp_country LIKE ?';
            queryValues.push(`%${params.country}%`);
          }
          if (params.postalCode) {
            query += ' AND emp_postal_code LIKE ?';
            queryValues.push(`%${params.postalCode}%`);
          }
          if (params.email) {
            query += ' AND emp_email LIKE ?';
            queryValues.push(`%${params.email}%`);
          }
          if (params.phone) {
            query += ' AND emp_phone LIKE ?';
            queryValues.push(`%${params.phone}%`);
          }
          if (params.isPermanent) {
            query += ' AND emp_is_permanent = ?';
            queryValues.push(params.isPermanent === 'true' ? 1 : 0);
          }
          if (params.position) {
            query += ' AND position_id = ?';
            queryValues.push(params.position);
          }
    
          // Execute the query using a safe method to avoid SQL injection
          db.query(query, queryValues, (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
    }
    */
}

module.exports = Employee;