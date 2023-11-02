const loginView = (req, res) => {
  const pageTitle = "Login";
  const pageStyle = "/css/login.css";
  res.render("login", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { loginView };
