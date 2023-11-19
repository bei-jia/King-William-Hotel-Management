// KING_WILLIAM_PROJECT/models/room/RoomStatus.js
const db = require('../../database');

class RoomStatus {
    static findAll(callback) {
        db.query('SELECT * FROM room_status', callback);
    }

    static findById(id, callback) {
        db.query('SELECT * FROM room_status WHERE rm_status_id = ?', [id], callback);
    }

    static create(newStatus, callback) {
        db.query('INSERT INTO room_status (rm_status_desc) VALUES (?)', [newStatus.rm_status_desc], callback);
    }

    static update(id, updatedStatus, callback) {
        db.query('UPDATE room_status SET rm_status_desc = ? WHERE rm_status_id = ?', [updatedStatus.rm_status_desc, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM room_status WHERE rm_status_id = ?', [id], callback);
    }
}

module.exports = RoomStatus;
