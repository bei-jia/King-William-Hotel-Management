const GuestTransaction = require("../models/Guest/GuestTransaction");
const allTransactionsView = (req, res) => {
  const pageTitle = "King William's - Transactions";
  const pageStyle = "/css/transaction/all-transactions.css";
  const filters = req.query
  GuestTransaction.findTransaction(filters).then(
      ([rows]) => {
        res.render("transaction/all-transactions", {
          pageTitle: pageTitle,
          pageStyle: pageStyle,
          transaction: rows
        });
      }).catch(err => res.status(500).send(err));
};

const addTransactionView = (req, res) => {
  const pageTitle = "King William's - Add Transaction";
  const pageStyle = "/css/transaction/add-transaction.css";
  res.render("transaction/add-transaction", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

const createTransactions = (req, res) =>{

  const item_id = parseInt(req.body.item_desc);

  const newTransaction = {
    guest_stay_id: req.body.guest_stay_id,
    item_id: item_id,
    guest_trans_item_quantity: req.body.guest_trans_item_quantity,
    guest_trans_price: req.body.item_price
  }

  GuestTransaction.createTransaction(
      newTransaction
  ).then(() => res.redirect('/transaction/all-transactions'))
      .catch(err => res.status(500).send(err.message));
};

module.exports = { allTransactionsView, addTransactionView, createTransactions };
