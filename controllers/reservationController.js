const addReservationView = (req, res) => {
  const pageTitle = "King William's - Add Reservation";
  const pageStyle = "/css/reservation/add-reservation.css";
  res.render("reservation/add-reservation", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { addReservationView };
