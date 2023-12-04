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

  // Use Promise.all to fetch both guest and empty rooms in parallel
  Promise.all([
    Reservation.findGuestById(id),
    Reservation.findEmptyRooms(),
  ])
    .then(([guestResult, emptyRoomsResult]) => {
      const [guestRows] = guestResult;
      const [emptyRoomsRows] = emptyRoomsResult;

      if (guestRows.length > 0) {
        res.render("reservation/add-reservation", {
          pageTitle: "King William's - Add Reservation",
          pageStyle: "/css/reservation/add-reservation.css",
          guest: guestRows[0],
          emptyRooms: emptyRoomsRows,
        });
      } else {
        res.status(404).send("Guest not found");
      }
    })
    .catch((err) => res.status(500).send(err));
};



const addReservation = async (req, res) => {
  try {
    const guestId = req.params.id;

    // Create a new reservation
    const newReservation = {
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      balance: 0,
      isCancelled: 0,
      cancelledTime: null,
      guestId: guestId,
      roomId: req.body.roomId,
    };

    // Call a method to add the reservation
    await Reservation.addReservation(newReservation);

    // Update the room status to rm_is_occupied = 1
    const roomUpdateSuccess = await Reservation.occupyRoom(req.body.roomId);

    if (roomUpdateSuccess) {
      // Redirect or send a response indicating success
      res.redirect("/reservation/all-reservations");
    } else {
      // Handle the case where the room was not found or update failed
      res.status(404).send('Room not found or failed to update room status');
    }
  } catch (error) {
    console.error(error);
    // Handle errors and send an appropriate error response
    res.status(500).send(error.message);
  }
};




// Attach an 'uncaughtException' event handler to log uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Handle or log the uncaught exception here
});

module.exports = { allReservationView, addReservationView, addReservation };
