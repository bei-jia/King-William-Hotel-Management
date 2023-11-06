function clearEntryBox(elementId) {
  document.getElementById(elementId).value = "";
}

function clearAllEntryBoxes() {
  var inputs = document.querySelectorAll(".entry-input");
  inputs.forEach(function (input) {
    input.value = "";
  });
}
