const pool = require("../database")

class Item {

    static createItems(newItems){
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO item (item_desc, item_price) VALUES (?, ?)`;

            console.log(newItems)

            const values = [
                newItems.item_desc,
                newItems.item_price
            ];

            console.log(values)

            pool.query(query, values, (err, results) => {
                if(err) reject(err);
                else resolve(results.insertId);
            });
        });
    }
    static findItems(filters){
        let query = "SELECT * FROM item";

        let conditions = [];
        let values = [];

        Object.keys(filters).forEach(key => {
            if(filters[key]){
                conditions.push(`${key} = ?`);
                values.push(filters[key]);
            }
        });

        if(conditions.length){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        return pool.promise().query(query, values);
    }
}

module.exports = Item;