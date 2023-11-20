const employeeController = require('../controllers/employeeController');
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
  addEmployee,
} = require("../controllers/employeeController");
const {
  allTransactionsView,
  addTransactionView,
} = require("../controllers/transactionController");

const router = express.Router();

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

// Room Routes
router.get("/room/all-rooms", allRoomsView);

// Reservation Routes
router.get("/reservation/all-reservations", allReservationView);
router.get("/reservation/add-reservation", addReservationView);

// Employee Routes
router.get("/employee/all-employees", allEmployeesView);
router.get("/employee/add-employee", addEmployeeView);
router.post("/employee/add-employee", addEmployee);

// Transaction Routes
router.get("/transaction/all-transactions", allTransactionsView);
router.get("/transaction/add-transaction", addTransactionView);

module.exports = router;
