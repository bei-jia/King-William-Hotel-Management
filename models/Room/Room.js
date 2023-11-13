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
    
            console.log("Query with room number:", query + " WHERE " + conditions.join(" AND "), values);
    
            const [rooms] = await db.promise().query(query + " WHERE " + conditions.join(" AND "), values);
            return rooms;
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

        const [rooms] = await db.promise().query(query, values);
        return rooms;
    }

}

module.exports = Room;