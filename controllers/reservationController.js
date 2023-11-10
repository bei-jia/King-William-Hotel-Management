const allReservationView = (req, res) => {
  const pageTitle = "King William's - Reservations";
  const pageStyle = "/css/reservation/all-reservations.css";
  res.render("reservation/all-reservations", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

const addReservationView = (req, res) => {
  const pageTitle = "King William's - Add Reservation";
  const pageStyle = "/css/reservation/add-reservation.css";
  res.render("reservation/add-reservation", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { allReservationView, addReservationView };
