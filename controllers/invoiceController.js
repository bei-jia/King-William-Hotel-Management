const invoiceView = (req, res) => {
  const pageTitle = "King William's - Invoice";
  const pageStyle = "/css/invoice.css";
  res.render("invoice", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { invoiceView };
