
const pool = require('../../database'); 

class Guest {
  static findByCriteria(criteria) {
    let query = "SELECT * FROM guest";
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
    return pool.promise().query("SELECT * FROM guest WHERE guest_id = ?", [id]);
  }

  
  static updateById(id, updateData) {
    let query = "UPDATE guest SET ";
    let updates = [];
    let values = [];

    Object.keys(updateData).forEach(key => {
      if (updateData[key]) {
        updates.push(`${key} = ?`);
        values.push(updateData[key]);
      }
    });

    query += updates.join(', ') + ' WHERE guest_id = ?';
    values.push(id);

    return pool.promise().query(query, values);
  }
}

module.exports = Guest;
