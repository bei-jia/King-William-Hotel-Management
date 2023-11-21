const employeeController = require("../controllers/employeeController");
const express = require("express");
const { loginView } = require("../controllers/loginController");
const { manageView } = require("../controllers/manageController");
const {
  allGuestsView,
  editGuestView,
  editGuest,
  addGuestView,
  addGuest
} = require("../controllers/guestController");
const { addItemView, allItemsView } = require("../controllers/itemController");
const { allRoomsView } = require("../controllers/roomController");
const {
  allReservationView,
  addReservationView,
  addReservation
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
const { invoiceView } = require("../controllers/invoiceController");

const router = express.Router();
const roomController = require("../controllers/roomController");
// Login Route
router.get("/login", loginView);

// Manage Route
router.get("/manage", manageView);

// Guest Routes
router.get("/guest/all-guests", allGuestsView);
router.get("/guest/edit-guest/:id", editGuestView);
router.post("/guest/update-guest/:id", editGuest);
router.get("/guest/add-guest", addGuestView);
router.post("/guest/add-guest", addGuest);

// Item Routes
router.get("/item/add-item", addItemView);
router.get("/item/all-items", allItemsView);

// Reservation Routes
router.get("/reservation/all-reservations", allReservationView);
router.get("/reservation/add-reservation-view/:id", addReservationView);
router.post("/reservation/add-reservation/:id", addReservation);

// Employee Routes
router.get("/employee/all-employees", allEmployeesView);
router.get("/employee/add-employee", addEmployeeView);
router.post("/employee/add-employee", addEmployee);

// Transaction Routes
router.get("/transaction/all-transactions", allTransactionsView);
router.get("/transaction/add-transaction", addTransactionView);

// Invoice Routes
router.get("/invoice/:id", invoiceView);

// Room Routes
router.get("/room/all-rooms", roomController.allRoomsView);
router.get("/room/search-rooms", roomController.searchRooms);

module.exports = router;
