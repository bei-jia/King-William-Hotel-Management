const allGuestView = (req, res) => {
  const pageTitle = "King William's - All Guests";
  const pageStyle = "/css/all-guests.css";
  res.render("guest/all-guests", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

const addGuestView = (req, res) => {
  const pageTitle = "King William's - Add Guest";
  const pageStyle = "/css/add-guest.css";
  res.render("guest/add-guest", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { allGuestView, addGuestView };
