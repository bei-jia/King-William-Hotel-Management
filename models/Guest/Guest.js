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

  static updateById(id, updateData, connection) {
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

    return connection.promise().query(query, values);
  }

  static create(newData, connection) {
    let query = "INSERT INTO guest (guest_fname, guest_lname, guest_phone, guest_email, guest_street, guest_city, guest_country, guest_postal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let values = [newData.guest_fname, newData.guest_lname, newData.guest_phone, newData.guest_email, newData.guest_street, newData.guest_city, newData.guest_country, newData.guest_postal_code];

    return connection.promise().query(query, values);
  }
}

module.exports = Guest;
