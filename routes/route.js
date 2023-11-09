const express = require("express");
const { loginView } = require("../controllers/loginController");
const { manageView } = require("../controllers/manageController");
const {
  allGuestView,
  addGuestView,
} = require("../controllers/guestController");
const {
  addGuestStayView,
  allGuestStaysView,
} = require("../controllers/guestStayController");
const { addItemView, allItemsView } = require("../controllers/itemController");

const router = express.Router();

// Login Route
router.get("/login", loginView);

// Manage Route
router.get("/manage", manageView);

// Guest Routes
router.get("/guest/all-guests", allGuestView);
router.get("/guest/add-guest", addGuestView);

// Guest Stay Routes
router.get("/guest-stay/add-guest-stay", addGuestStayView);
router.get("/guest-stay/all-guest-stays", allGuestStaysView);

// Item Routes
router.get("/item/add-item", addItemView);
router.get("/item/all-items", allItemsView);

module.exports = router;
