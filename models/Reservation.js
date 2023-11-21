const pool = require('../database'); 

class Reservation {

  // Return rows that matches the criteria. This is used for search functionality.
  static findByCriteria(criteria) {
    let query = "SELECT * FROM guest_stay inner join guest on guest_stay.guest_id=guest.guest_id inner join room on guest_stay.rm_id=room.rm_id";
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
  };


 
};


module.exports = Reservation;