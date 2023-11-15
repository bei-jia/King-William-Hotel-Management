const Guest = require('../models/Guest/Guest');

const allGuestsView = (req, res) => {
  const criteria = req.query;
  Guest.findByCriteria(criteria)
    .then(([rows]) => {
      res.render("guest/all-guests", {
        pageTitle: "King William's - All Guests",
        pageStyle: "/css/guest/all-guests.css",
        guests: rows
      });
    })
    .catch(err => res.status(500).send(err));
};

const editGuestView = (req, res) => {
  const id = req.params.id;
  Guest.findById(id)
    .then(([rows]) => {
      if (rows.length > 0) {
        res.render("guest/edit-guest", {
          pageTitle: "King William's - Edit Guest",
          pageStyle: "/css/guest/edit-guest.css",
          guest: rows[0]
        });
      } else {
        res.status(404).send('Guest not found');
      }
    })
    .catch(err => res.status(500).send(err));
};

const editGuest = (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  Guest.updateById(id, updateData)
    .then(() => {
      res.redirect('/guest/all-guests');
    })
    .catch(err => res.status(500).send(err));
};

module.exports = { allGuestsView, editGuestView, editGuest };
