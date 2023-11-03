const express = require("express");
const { loginView } = require("../controllers/loginController");
const { manageController } = require("../controllers/manageController");
const {
  allGuestView,
  addGuestView,
} = require("../controllers/guestController");
const { addReservationView } = require("../controllers/reservationController");
const { addServiceView } = require("../controllers/serviceController");

const router = express.Router();

// Login Route
router.get("/login", loginView);

// Manage Route
router.get("/manage", manageController);

// Guest Routes
router.get("/guest/all-guests", allGuestView);
router.get("/guest/add-guest", addGuestView);

// Reservation Routes
router.get("/reservation/add-reservation", addReservationView);

// Service Routes
router.get("/service/add-service", addServiceView);

module.exports = router;
