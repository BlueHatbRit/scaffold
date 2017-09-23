$(function() {
  let emailElement = "#email";
  let passwordElement = "#password";
  let loginButton = "#login-button";

  // Validate email
  $(emailElement).change(function(e) {
    let email = e.target.value;

    autoValidateField(isValidEmail, email, emailElement);
  });

  // Enable the login button when the fields are complete
  $("input").on("input", function(e) {
    let email = $(emailElement).val();
    let emailIsValid = isValidEmail(email);

    // We're not doing a password check on login as that
    // would only see to help account hacking.
    if (emailIsValid) {
      $(loginButton).prop("disabled", false);
    } else {
      $(loginButton).prop("disabled", true);
    }
  });
});
