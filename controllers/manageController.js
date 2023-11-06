const manageController = (req, res) => {
  const pageTitle = "King William's - Manage";
  const pageStyle = "/css/manage.css";
  res.render("manage", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { manageController };
