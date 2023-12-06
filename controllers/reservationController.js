const Reservation = require("../models/Reservation");
const Room = require("../models/Room/Room");

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

  res.render("reservation/add-reservation", {
    pageTitle: "King William's - Add Reservation",
    pageStyle: "/css/reservation/add-reservation.css",
    guestId: id,
  });
};

const chooseRoomView = (req, res) => {
  const id = req.params.id;
  const checkInDate = req.query.checkInDate;
  const checkOutDate = req.query.checkOutDate;

  Reservation.findAvailableRooms(checkInDate, checkOutDate).then(
    ([availableRooms]) => {
      res.render("reservation/choose-room", {
        pageTitle: "King William's - Choose Room",
        pageStyle: "/css/reservation/choose-room.css",
        guestId: id,
        availableRooms: availableRooms,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      });
    }
  );
};

const addReservation = async (req, res) => {
  try {
    const guestId = req.params.id;

    Room.getByFilters({ roomNumber: req.body.roomId }).then(async ([room]) => {
      const checkInDate = req.body.checkInDate;
      const checkOutDate = req.body.checkOutDate;

      const date1 = new Date(checkInDate);
      const date2 = new Date(checkOutDate);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const roomPrice = parseFloat(room.rm_base_rate * parseInt(diffDays));

      // Create a new reservation
      const newReservation = {
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        balance: roomPrice * 1.13,
        isCancelled: 0,
        cancelledTime: null,
        guestId: guestId,
        roomId: req.body.roomId,
      };

      // Call a method to add the reservation
      await Reservation.addReservation(newReservation);

      // Redirect or send a response indicating success
      res.redirect("/reservation/all-reservations");
    });
  } catch (error) {
    console.error(error);
    // Handle errors and send an appropriate error response
    res.status(500).send(error.message);
  }
};

const deleteReservation = (req, res) => {
  const id = req.params.id;

  Reservation.deleteReservation(id)
    .then(() => {
      res.redirect("/reservation/all-reservations");
    })
    .catch((err) => res.status(500).send(err));
};

// Attach an 'uncaughtException' event handler to log uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // Handle or log the uncaught exception here
});

module.exports = {
  allReservationView,
  addReservationView,
  addReservation,
  chooseRoomView,
  deleteReservation,
};
