const Item = require("../models/Item");

const addItemView = (req, res) => {
  const pageTitle = "King William's - Add Item";
  const pageStyle = "/css/item/add-item.css";
  res.render("item/add-item", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

const allItemsView = (req, res) => {
  const pageTitle = "King William's - All Items";
  const pageStyle = "/css/item/all-items.css";
  const filters = req.query
  Item.findItems(filters).then(
      ([rows]) => {
        res.render("item/all-items", {
          pageTitle: pageTitle,
          pageStyle: pageStyle,
          items: rows
        });
      }).catch(err => res.status(500).send(err));
};

const createItemsView = (req, res) =>{
  const newItems = {
    item_desc: req.body.item_desc,
    item_price: req.body.item_price
  }

  Item.createItems(
      newItems
  ).then(() => res.redirect('/item/all-items'))
      .catch(err => res.status(500).send(err.message));
};

module.exports = { addItemView, allItemsView, createItemsView };
