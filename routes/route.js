const express = require("express");
const { loginView, login } = require("../controllers/loginController");

const { manageView } = require("../controllers/manageController");
const {
  allGuestsView,
  editGuestView,
  addGuestView,
  addGuest,
} = require("../controllers/guestController");
const {
  addItemView,
  allItemsView,
  createItemsView,
} = require("../controllers/itemController");
const { allRoomsView, editRoomView } = require("../controllers/roomController");
const {
  allReservationView,
  addReservationView,
  addReservation,
} = require("../controllers/reservationController");
const {
  allEmployeesView,
  addEmployeeView,
} = require("../controllers/employeeController");
const {
  allTransactionsView,
  addTransactionView,
  createTransactions,
} = require("../controllers/transactionController");
const { create } = require("express-handlebars");

const router = express.Router();

// Login Route
router.get("/login", loginView);
router.post("/login", login);

// Manage Route
router.get("/", manageView);

// Guest Routes
router.get("/guest/all-guests", allGuestsView);
router.get("/guest/add-guest", addGuestView);
router.post("/guest/add-guest", addGuest);
router.get("/guest/edit-guest", editGuestView);

// Item Routes
router.get("/item/add-item", addItemView);
router.post("/item/add-item", createItemsView);
router.get("/item/all-items", allItemsView);

// Room Routes
router.get("/room/all-rooms", allRoomsView);
router.get("/room/edit-room/:id", editRoomView);

// Reservation Routes
router.get("/reservation/all-reservations", allReservationView);
router.get("/reservation/add-reservation/:id", addReservationView);
router.post("/reservation/add-reservation/:id", addReservation);

// Employee Routes
router.get("/employee/all-employees", allEmployeesView);
router.get("/employee/add-employee", addEmployeeView);

// Transaction Routes
router.get("/transaction/all-transactions", allTransactionsView);
router.get("/transaction/add-transaction", addTransactionView);
router.post("/transaction/add-transaction", createTransactions);

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
