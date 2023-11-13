// KING_WILLIAM_PROJECT/models/room/RoomRate.js
const db = require('../../database');

class RoomRate {
    static findAll(callback) {
        db.query('SELECT * FROM room_rate', callback);
    }

    static findById(id, callback) {
        db.query('SELECT * FROM room_rate WHERE rm_rate_id = ?', [id], callback);
    }

    static create(newRate, callback) {
        db.query('INSERT INTO room_rate (rm_base_rate, rm_seasonal_rate_id, rm_category_id) VALUES (?, ?, ?)', [newRate.rm_base_rate, newRate.rm_seasonal_rate_id, newRate.rm_category_id], callback);
    }

    static update(id, updatedRate, callback) {
        db.query('UPDATE room_rate SET rm_base_rate = ?, rm_seasonal_rate_id = ?, rm_category_id = ? WHERE rm_rate_id = ?', [updatedRate.rm_base_rate, updatedRate.rm_seasonal_rate_id, updatedRate.rm_category_id, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM room_rate WHERE rm_rate_id = ?', [id], callback);
    }
}

module.exports = RoomRate;
