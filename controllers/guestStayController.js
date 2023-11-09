const addGuestStayView = (req, res) => {
  const pageTitle = "King William's - Add Guest Stay";
  const pageStyle = "/css/guest-stay/add-guest-stay.css";
  res.render("guest-stay/add-guest-stay", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

const allGuestStaysView = (req, res) => {
  const pageTitle = "King William's - All Guest Stays";
  const pageStyle = "/css/guest-stay/all-guest-stay.css";
  res.render("guest-stay/all-guest-stays", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { addGuestStayView, allGuestStaysView };
