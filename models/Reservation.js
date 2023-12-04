const pool = require("../database");

class Reservation {
  // Return rows that matches the criteria. This is used for search functionality.
  static findByCriteria(criteria) {
    let query =
      "SELECT * FROM guest_stay inner join guest on guest_stay.guest_id=guest.guest_id inner join room on guest_stay.rm_id=room.rm_id";
    let conditions = [];
    let values = [];

    Object.keys(criteria).forEach((key) => {
      if (criteria[key]) {
        conditions.push(`${key} = ?`);
        values.push(criteria[key]);
      }
    });

    if (conditions.length) {
      query += " WHERE " + conditions.join(" AND ");
    }

    return pool.promise().query(query, values);
  }

  // Find the guest ID
  static findGuestById(id) {
    return pool.promise().query("SELECT * FROM guest WHERE guest_id = ?", [id]);
  }

   // Find rooms that are not occupied
   static findEmptyRooms() {
    return pool.promise().query("SELECT * FROM room WHERE rm_is_occupied = 0" );
  }

  // Update the room so that the room is occupied
  static async occupyRoom(roomId) {
    try {
      const query = 'UPDATE room SET rm_is_occupied = 1 WHERE rm_id = ?';
      const [result] = await pool.promise().query(query, [roomId]);

      // Check if the update was successful
      if (result.affectedRows > 0) {
        console.log(`Room status updated for roomId ${roomId}`);
        return true;
      } else {
        console.log(`Room with roomId ${roomId} not found`);
        return false;
      }
    } catch (error) {
      console.error('Error updating room status:', error);
      throw error;
    }
  }

  // Insert
  static addReservation(newReservation) {
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO guest_stay 
                 (guest_stay_check_in_date, guest_stay_check_out_date, guest_stay_balance, 
                  guest_stay_is_cancelled, guest_stay_cancelled_time, guest_id, rm_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        newReservation.checkInDate,
        newReservation.checkOutDate,
        newReservation.balance,
        newReservation.isCancelled,
        newReservation.cancelledTime,
        newReservation.guestId,
        newReservation.roomId,
      ];
      pool.query(query, values, (err, results) => {
        if (err) reject(err);
        else resolve(results.insertId); 
      });
    });
  }
}

module.exports = Reservation;
