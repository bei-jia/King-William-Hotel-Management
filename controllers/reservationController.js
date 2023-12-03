const Reservation = require("../models/Reservation");

const allReservationView = (req, res) => {
  const criteria = req.query;
  const pageTitle = "King William's - Reservations";
  const pageStyle = "/css/reservation/all-reservations.css";

  Reservation.findByCriteria(criteria)
    .then(([rows]) => {
      res.render("reservation/all-reservations", {
        pageTitle: pageTitle,
        pageStyle: pageStyle,
        reservation: rows,
      });
    })
    .catch((err) => res.status(500).send(err));
};

const addReservationView = (req, res) => {
  const id = req.params.id;
  Reservation.findGuestById(id)
    .then(([rows]) => {
      if (rows.length > 0) {
        res.render("reservation/add-reservation", {
          pageTitle: "King William's - Add Reservation",
          pageStyle: "/css/reservation/add-reservation.css",
          guest: rows[0],
        });
      } else {
        res.status(404).send("Guest not found");
      }
    })
    .catch((err) => res.status(500).send(err));
};

const addReservation = (req, res) => {
  const guestId = req.params.id;
  const newReservation = {
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    balance: 0,
    isCancelled: 0,
    cancelledTime: null,
    guestId: guestId,
    roomId: req.body.roomId,
  };

  Reservation.addReservation(newReservation)
    .then(() => res.redirect("/reservation/all-reservations"))
    .catch((err) => res.status(500).send(err.message));
};
module.exports = { allReservationView, addReservationView, addReservation };
