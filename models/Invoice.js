const pool = require("../database");

class Invoice {
  // Find a row based on guest_stay_id
  static findInvoiceById(id) {
    return pool.promise().query(
      `SELECT 
        guest.guest_fname,
        guest.guest_lname,
        guest.guest_street,
        guest.guest_city,
        guest.guest_phone,
        item_desc,
        guest_trans_item_quantity,
        guest_trans_price,
        room_rate.rm_base_rate
        FROM guest_stay inner join guest on guest_stay.guest_id=guest.guest_id 
        inner join room on guest_stay.rm_id=room.rm_id
        inner join room_category on room.rm_category_id=room_category.rm_category_id
        inner join room_rate on room_category.rm_category_id=room_rate.rm_category_id
        inner join guest_transaction on guest_stay.guest_stay_id=guest_transaction.guest_stay_id 
        inner join item on item.item_id=guest_transaction.item_id WHERE guest_stay.guest_stay_id = ?`,
      [id]
    );
  }
}

module.exports = Invoice;
