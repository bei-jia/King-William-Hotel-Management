const pool = require("../database");

class Invoice {
  // Find a row based on guest_stay_id
  static findInvoiceById(id) {
    return pool
      .promise()
      .query(
        "SELECT * FROM guest_stay inner join guest on guest_stay.guest_id=guest.guest_id inner join guest_transaction on guest_stay.guest_stay_id=guest_transaction.guest_stay_id inner join item on item.item_id=guest_transaction.item_id WHERE guest_stay.guest_stay_id = ?",
        [id]
      );
  }
};

module.exports = Invoice;
