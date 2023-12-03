const pool = require("../database");
const Room = require("../models/Room/Room");
const allRoomsView = async (req, res) => {
  try {
    const rooms = await Room.getByFilters({});
    res.render("room/all-rooms", {
      pageTitle: "King William's - Rooms",
      pageStyle: "/css/room/all-rooms.css",
      rooms: rooms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// roomController.js
const editRoomView = (req, res) => {
  const pageTitle = "King William's - Edit Room";
  const pageStyle = "/css/room/edit-room.css";
  res.render("room/edit-room", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

const searchRooms = async (req, res) => {
  try {
    const filters = {
      roomNumber: req.query.roomNumber,
      category: req.query.category,
      occupied: req.query.occupied,
      status: req.query.status,
    };
    console.log("Query parameters received:", req.query);
    const rooms = await Room.getByFilters(req.query);
    res.render("room/all-rooms", {
      pageTitle: "King William's - Rooms",
      pageStyle: "/css/room/all-rooms.css",
      rooms: rooms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { allRoomsView, searchRooms, editRoomView };
