// KING_WILLIAM_PROJECT/models/room/RoomCategory.js
const db = require('../../database');

class RoomCategory {
    static findAll(callback) {
        db.query('SELECT * FROM room_category', callback);
    }

    static findById(id, callback) {
        db.query('SELECT * FROM room_category WHERE rm_category_id = ?', [id], callback);
    }

    static create(newCategory, callback) {
        db.query('INSERT INTO room_category (rm_category) VALUES (?)', [newCategory.rm_category], callback);
    }

    static update(id, updatedCategory, callback) {
        db.query('UPDATE room_category SET rm_category = ? WHERE rm_category_id = ?', [updatedCategory.rm_category, id], callback);
    }

    static delete(id, callback) {
        db.query('DELETE FROM room_category WHERE rm_category_id = ?', [id], callback);
    }
}

module.exports = RoomCategory;
