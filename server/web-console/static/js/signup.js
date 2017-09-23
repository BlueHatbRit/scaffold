$(function() {
  let emailElement = "#email";
  let passwordElement = "#password";
  let confirmPasswordElement = "#confirm-password";
  let submitButton = "#create-account-btn";

  // Email auto field validation
  $(emailElement).change(function(e) {
    let email = e.target.value;
    let element = emailElement;

    autoValidateField(isValidEmail, email, element);
  });

  // First password auto field validation
  $(passwordElement).change(function(e) {
    let password = e.target.value;
    let element = passwordElement;

    autoValidateField(isValidPassword, password, element);
  });

  // Confirm password auto field validation
  $(confirmPasswordElement).change(function(e) {
    let passwords = [$(passwordElement).val(), e.target.value];
    let element = confirmPasswordElement;

    autoValidateField(bothPasswordsAreTheSame, passwords, element);
  });

  // Enable button when all fields are valid
  $("input").on("input", function(e) {
    let email = $(emailElement).val();
    let emailIsValid = isValidEmail(email);

    let password = $(passwordElement).val();
    let passwordIsValid = isValidPassword(password);

    let secondPassword = $(confirmPasswordElement).val();
    let confPassIsValid = bothPasswordsAreTheSame([password, secondPassword]);

    if (emailIsValid && passwordIsValid && confPassIsValid) {
      $(submitButton).prop("disabled", false);
    } else {
      $(submitButton).prop("disabled", true);
    }
  });
});
