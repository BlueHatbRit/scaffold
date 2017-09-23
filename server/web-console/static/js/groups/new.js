$(function() {
  // Warp flag name
  $("#name-input").on("input", function(e) {
    e.target.value = warpGroupName(e.target.value);
  });

  // Warp description
  $("#description-input").on("input", function(e) {
    const maxLength = 140;
    let value = e.target.value;

    // Restrict to the max length
    if (value.length > maxLength) {
      value = value.substring(0, maxLength);
    }

    e.target.value = value;
  });

  $("input").on("input", function(e) {
    let submitButton = $("#create-group-btn");
    let name = $("#name-input").val();
    let nameIsValid = isValidGroupName(name);

    submitButton.prop("disabled", !nameIsValid);
  });
});
