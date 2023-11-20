const Reservation = require('../models/Reservation');

const allReservationView = (req, res) => {
  const criteria = req.query;
  const pageTitle = "King William's - Reservations";
  const pageStyle = "/css/reservation/all-reservations.css";

  Reservation.findByCriteria(criteria)
    .then(([rows]) => {
      res.render("reservation/all-reservations", {
        pageTitle: pageTitle,
        pageStyle: pageStyle,
        reservation: rows
      });
    })
    .catch(err => res.status(500).send(err));
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
