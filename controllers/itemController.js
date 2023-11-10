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
  res.render("item/all-items", {
    pageTitle: pageTitle,
    pageStyle: pageStyle,
  });
};

module.exports = { addItemView, allItemsView };
