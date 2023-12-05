const db = require('../../database'); 

class Room {
    // ...
    static async getByFilters(filters) {
        let query = `
            SELECT r.*, rc.rm_category, rs.rm_status_desc, rr.rm_base_rate, rsr.rm_seasonal_rate
            FROM room r
            INNER JOIN room_category rc ON r.rm_category_id = rc.rm_category_id
            INNER JOIN room_status rs ON r.rm_status_id = rs.rm_status_id
            INNER JOIN room_rate rr ON r.rm_category_id = rr.rm_category_id
            INNER JOIN room_seasonal_rate rsr ON rr.rm_seasonal_rate_id = rsr.rm_seasonal_rate_id
        `;

        const conditions = [];
        const values = [];

        if (filters.roomNumber) {
            conditions.push("r.rm_id = ?");
            values.push(parseInt(filters.roomNumber));
        }
        if (filters.category) {
            conditions.push("rc.rm_category = ?");
            values.push(filters.category);
        }
        if (filters.occupied !== undefined) {
            conditions.push("r.rm_is_occupied = ?");
            values.push(filters.occupied);
        }
        if (filters.status) {
            if (filters.status === 'Something is wrong') {
                conditions.push("rs.rm_status_desc != ?");
                values.push('Everything is in good condition');
            } else {
                conditions.push("rs.rm_status_desc = ?");
                values.push(filters.status);
            }
        }

        if (conditions.length) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += " ORDER BY r.rm_id ASC";

        const [rooms] = await db.promise().query(query, values);
        return rooms;
    }

    static async findById(roomId) {
        const query = `
            SELECT r.*, rc.rm_category, rs.rm_status_desc, rr.rm_base_rate, rsr.rm_seasonal_rate
            FROM room r
            INNER JOIN room_category rc ON r.rm_category_id = rc.rm_category_id
            INNER JOIN room_status rs ON r.rm_status_id = rs.rm_status_id
            INNER JOIN room_rate rr ON r.rm_category_id = rr.rm_category_id
            INNER JOIN room_seasonal_rate rsr ON rr.rm_seasonal_rate_id = rsr.rm_seasonal_rate_id
            WHERE r.rm_id = ?
        `;
        const [room] = await db.promise().query(query, [roomId]);
        return room[0];
    }

    static async update(roomId, updatedData) {
        const query = `
            UPDATE room
            SET rm_status_id = ?, rm_is_occupied = ?
            WHERE rm_id = ?
        `;
        await db.promise().query(query, [updatedData.rm_status_id, updatedData.rm_is_occupied, roomId]);
    }

}

module.exports = Room;