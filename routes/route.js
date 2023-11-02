const express = require("express");
const { loginView } = require("../controllers/loginController");
const {
  allGuestView,
  addGuestView,
} = require("../controllers/guestController");

const router = express.Router();

// Login Route
router.get("/", loginView);

// Guest Route
router.get("/guest/all-guests", allGuestView);
router.get("/guest/add-guest", addGuestView);

module.exports = router;
