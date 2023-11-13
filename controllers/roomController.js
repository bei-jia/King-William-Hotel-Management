// KING_WILLIAM_PROJECT/controllers/roomController.js

const pool = require('../database');
const Room = require('../models/Room/Room');
const allRoomsView = (req, res) => {
    const pageTitle = "King William's - Rooms";
    const pageStyle = "/css/room/all-rooms.css";
    res.render("room/all-rooms", {
        pageTitle: pageTitle,
        pageStyle: pageStyle,
    });
};

const searchRooms = async (req, res) => {
    try {
        const rooms = await Room.getByFilters(req.query);
        res.render("room/all-rooms", {
            pageTitle: "King William's - Rooms",
            pageStyle: "/css/room/all-rooms.css",
            rooms: rooms
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = { allRoomsView, searchRooms };
