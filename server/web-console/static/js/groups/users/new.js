$(function() {
  $("#email").on("input", function(e) {
    e.target.value = e.target.value.replace(" ", "");

    let btn = $("#add-user-btn");
    if (e.target.value != "" && isValidEmail(e.target.value)) {
      btn.prop("disabled", false);
    } else {
      btn.prop("disabled", true);
    }
  });

  $("#email").change(function(e) {
    let email = e.target.value;
    let element = "#email";

    emailComplete = autoValidateField(isValidEmail, email, element);
  });
});
