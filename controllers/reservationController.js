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
      // Create a new reservation
      const newReservation = {
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        balance: room.rm_base_rate * 1.13,
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
};
