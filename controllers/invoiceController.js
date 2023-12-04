const Invoice = require("../models/Invoice");

const invoiceView = (req, res) => {
  const id = req.params.id;
  Invoice.findInvoiceById(id)
    .then(([rows]) => {
      if (rows.length > 0) {
        res.render("invoice", {
          pageTitle: "King William's - View Invoice",
          pageStyle: "/css/invoice.css",
          invoice: rows[0],
          transactions: rows,
          roomPrice: rows[0].rm_base_rate,
        });
      } else {
        res
          .status(404)
          .send("Invoice not found. This guest has no transactions.");
      }
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = { invoiceView };
