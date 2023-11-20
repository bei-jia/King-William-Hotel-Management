
function clearEntryBox(elementId) {
  document.getElementById(elementId).value = "";
}

function clearAllEntryBoxes() {
  var inputs = document.querySelectorAll(".entry-input");
  inputs.forEach(function (input) {
    input.value = "";
  });
}

document.getElementById("clear-all").addEventListener("click", function (e) {
  e.preventDefault();
  clearAllEntryBoxes();
});

function convertTinyInt(tinyInt) {
  if (tinyInt = 0)
  {
    return "No";
  }
  else if (tynyIny = 1) {
    return "Yes";
  }
}