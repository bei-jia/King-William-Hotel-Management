const loginView = (req, res) => {
  const pageTitle = "Login";
  const pageStyle = "/login.css";
  res.render("login", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { loginView };
