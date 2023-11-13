const express = require("express");
const { loginView } = require("../controllers/loginController");
const { manageView } = require("../controllers/manageController");
const {
  allGuestsView,
  editGuestView,
} = require("../controllers/guestController");
const { addItemView, allItemsView } = require("../controllers/itemController");
const { allRoomsView } = require("../controllers/roomController");
const {
  allReservationView,
  addReservationView,
} = require("../controllers/reservationController");
const {
  allEmployeesView,
  addEmployeeView,
} = require("../controllers/employeeController");
const {
  allTransactionsView,
  addTransactionView,
} = require("../controllers/transactionController");

const router = express.Router();
const roomController = require("../controllers/roomController");
// Login Route
router.get("/login", loginView);

// Manage Route
router.get("/manage", manageView);

// Guest Routes
router.get("/guest/all-guests", allGuestsView);
router.get("/guest/edit-guest", editGuestView);

// Item Routes
router.get("/item/add-item", addItemView);
router.get("/item/all-items", allItemsView);


// Reservation Routes
router.get("/reservation/all-reservations", allReservationView);
router.get("/reservation/add-reservation", addReservationView);

// Employee Routes
router.get("/employee/all-employees", allEmployeesView);
router.get("/employee/add-employee", addEmployeeView);

// Transaction Routes
router.get("/transaction/all-transactions", allTransactionsView);
router.get("/transaction/add-transaction", addTransactionView);

// Room Routes
router.get("/room/all-rooms", roomController.allRoomsView);
router.get("/room/search-rooms", roomController.searchRooms);

module.exports = router;
