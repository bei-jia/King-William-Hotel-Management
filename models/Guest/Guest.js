
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

  static create(guestData) {
    let query = "INSERT INTO guest (guest_fname, guest_lname, guest_phone, guest_email, guest_street, guest_city, guest_country, guest_postal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let values = [guestData.guest_fname, guestData.guest_lname, guestData.guest_phone, guestData.guest_email, guestData.guest_street, guestData.guest_city, guestData.guest_country, guestData.guest_postal_code];
    return pool.promise().query(query, values);
  }
}



module.exports = Guest;
