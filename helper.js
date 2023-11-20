const Handlebars = require("handlebars");

Handlebars.registerHelper("formatDate", function (date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
});

Handlebars.registerHelper("convertToYesNo", function (value) {
  return value === 1 ? "Yes" : "No";
});

Handlebars.registerHelper("calculateTotal", function (quantity, price) {
  const numericQuantity = parseFloat(quantity);
  const numericPrice = parseFloat(price);

  if (!isNaN(numericQuantity) && !isNaN(numericPrice)) {
    const total = numericQuantity * numericPrice;
    return "$" + total.toFixed(2);
  }

  return "$0.00";
});

Handlebars.registerHelper("calculateSubtotal", function (transactions) {
  let subtotal = 0;

  transactions.forEach((transaction) => {
    const total = parseFloat(transaction.guest_trans_item_quantity) * parseFloat(transaction.guest_trans_price);
    subtotal += isNaN(total) ? 0 : total;
  });

  return subtotal.toFixed(2);
});

Handlebars.registerHelper('calculateTax', function (subtotal, taxRate) {
  // Ensure subtotal and taxRate are numeric values
  const numericSubtotal = parseFloat(subtotal);
  const numericTaxRate = parseFloat(taxRate);

  if (isNaN(numericSubtotal) || isNaN(numericTaxRate)) {
    return "$0.00"; // or handle the error as needed
  }

  const Tax = numericSubtotal * taxRate;

  // Format the result as $$.$$
  return Tax.toFixed(2);
});

Handlebars.registerHelper('calculateGrandtotal', function (subtotal, tax) {
  // Ensure subtotal and taxRate are numeric values
  const numericSubtotal = parseFloat(subtotal);
  const numericTax = parseFloat(tax);

  if (isNaN(numericSubtotal) || isNaN(numericTax)) {
    return "error"; // or handle the error as needed
  }

  const grandTotal = numericSubtotal + numericTax;

  // Format the result as $$.$$
  return grandTotal.toFixed(2);
});

Handlebars.registerHelper("formatCurrency", function (value) {
  // Convert value to a number using parseFloat
  const numericValue = parseFloat(value);

  // Check if numericValue is a valid number
  if (!isNaN(numericValue)) {
    // Format as currency with two decimal places
    return "$" + numericValue.toFixed(2);
  }

  // If the value is not a valid number, return an empty string or handle the error as needed
  return "";
});
