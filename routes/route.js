const express = require("express");
const { loginView, login } = require("../controllers/loginController");

const { manageView } = require("../controllers/manageController");
const {
  allGuestsView,
  editGuestView,
  addGuestView,
  addGuest,
  editGuest,
} = require("../controllers/guestController");
const {
  addItemView,
  allItemsView,
  createItemsView,
} = require("../controllers/itemController");
const {
  allRoomsView,
  editRoomView,
  searchRooms,
  updateRoom,
} = require("../controllers/roomController");
const {
  allReservationView,
  addReservationView,
  addReservation,
  chooseRoomView,
} = require("../controllers/reservationController");
const {
  allEmployeesView,
  addEmployeeView,
  addEmployee,
  editEmployeeView,
  editEmployee,
} = require("../controllers/employeeController");
const {
  allTransactionsView,
  addTransactionView,
  createTransactions,
} = require("../controllers/transactionController");
const { invoiceView } = require("../controllers/invoiceController");

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
router.get("/guest/edit-guest/:id", editGuestView);
router.post("/guest/edit-guest/:id", editGuest);

// Item Routes
router.get("/item/add-item", addItemView);
router.post("/item/add-item", createItemsView);
router.get("/item/all-items", allItemsView);

// Room Routes
router.get("/room/all-rooms", allRoomsView);
router.get("/room/search-rooms", searchRooms);
router.get("/room/edit-room/:id", editRoomView);
router.post("/room/edit-room/:id", updateRoom);

// Reservation Routes
router.get("/reservation/all-reservations", allReservationView);
router.get("/reservation/add-reservation/:id", addReservationView);
router.post("/reservation/add-reservation/:id", addReservation);
router.get("/reservation/choose-room/:id", chooseRoomView);

// Employee Routes
router.get("/employee/all-employees", allEmployeesView);
router.get("/employee/add-employee", addEmployeeView);
router.post("/employee/add-employee", addEmployee);
router.get("/employee/edit-employee/:id", editEmployeeView);
router.post("/employee/edit-employee/:id", editEmployee);

// Transaction Routes
router.get("/transaction/all-transactions", allTransactionsView);
router.get("/transaction/add-transaction", addTransactionView);
router.post("/transaction/add-transaction", createTransactions);

// Invoice Routes
router.get("/invoice/:id", invoiceView);

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
