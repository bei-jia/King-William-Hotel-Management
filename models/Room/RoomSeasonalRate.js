// KING_WILLIAM_PROJECT/models/room/RoomSeasonalRate.js
const db = require('../../database');

class RoomSeasonalRate {
    static findAll(callback) {
        db.query('SELECT * FROM room_seasonal_rate', callback);
    }

    static findById(id, callback) {
        db.query('SELECT * FROM room_seasonal_rate WHERE rm_seasonal_rate_id = ?', [id], callback);
    }

    static create(newRate, callback) {
        db.query('INSERT INTO room_seasonal_rate (rm_seasonal_rate, rm_seasonal_rate_start_date, rm_seasonal_rate_end_date) VALUES (?, ?, ?)', [newRate.rm_seasonal_rate, newRate.rm_seasonal_rate_start_date, newRate.rm_seasonal_rate_end_date], callback);
    }

    static update(id, updatedRate, callback) {
        db.query('UPDATE room_seasonal_rate SET rm_seasonal_rate = ?, rm_seasonal_rate_start_date = ?, rm_seasonal_rate_end_date = ? WHERE rm_seasonal_rate_id = ?', [updatedRate.rm_seasonal_rate, updatedRate.rm_seasonal_rate_start_date, updatedRate.rm_seasonal_rate_end_date, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM room_seasonal_rate WHERE rm_seasonal_rate_id = ?', [id], callback);
    }
}

module.exports = RoomSeasonalRate;
