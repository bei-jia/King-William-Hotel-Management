const allRoomsView = (req, res) => {
  const pageTitle = "King William's - Rooms";
  const pageStyle = "/css/room/all-rooms.css";
  res.render("room/all-rooms", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { allRoomsView };
