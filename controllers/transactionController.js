const allTransactionsView = (req, res) => {
  const pageTitle = "King William's - Transactions";
  const pageStyle = "/css/transaction/all-transactions.css";
  res.render("transaction/all-transactions", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

const addTransactionView = (req, res) => {
  const pageTitle = "King William's - Add Transaction";
  const pageStyle = "/css/transaction/add-transaction.css";
  res.render("transaction/add-transaction", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { allTransactionsView, addTransactionView };
