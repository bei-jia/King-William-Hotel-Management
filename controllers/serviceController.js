const addServiceView = (req, res) => {
  const pageTitle = "King William's - Add Service";
  const pageStyle = "/css/add-service.css";
  res.render("service/add-service", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { addServiceView };
