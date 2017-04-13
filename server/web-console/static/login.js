$(function() {
    let emailElement = '#email';
    let passwordElement = '#password';
    let loginButton = '#login-button';

    // Validate email
    $(emailElement).change(function(e) {
        let email = e.target.value;

        autoValidateField(
            isValidEmail,
            email,
            emailElement
        );
    });

    // Validate password
    $(passwordElement).change(function(e) {
        let password = e.target.value;

        autoValidateField(
            isValidPassword,
            password,
            passwordElement
        );
    });

    // Enable the login button when the fields are complete
    $('input').on('input', function(e) {
        let email = $(emailElement).val();
        let emailIsValid = isValidEmail(email);

        let password = $(passwordElement).val();
        let passwordIsValid = isValidPassword(password);

        if (emailIsValid && passwordIsValid) {
            $(loginButton).prop('disabled', false);
        } else {
            $(loginButton).prop('disabled', true);
        }
    });
});