const allGuestsView = (req, res) => {
  const pageTitle = "King William's - All Guests";
  const pageStyle = "/css/guest/all-guests.css";
  res.render("guest/all-guests", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

const editGuestView = (req, res) => {
  const pageTitle = "King William's - Edit Guest";
  const pageStyle = "/css/guest/edit-guest.css";
  res.render("guest/edit-guest", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { allGuestsView, editGuestView };
