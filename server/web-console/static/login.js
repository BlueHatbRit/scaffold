$(function() {
    let emailComplete = false;
    let passwordComplete = false;

    function checkLoginEnabled() {
        let button = $('#login-button');

        if (emailComplete && passwordComplete) {
            button.prop('disabled', false);
        } else {
            button.prop('disabled', true)
        }
    }

    $("input[name='email']").change(function(e) {
        let email = e.target.value;
        let element = "input[name='email']";

        emailComplete = autoValidateField(isValidEmail, email, element);
        checkLoginEnabled();
    });

    $("input[name='password']").change(function(e) {
        let password = e.target.value;
        let element = "input[name='password']";

        passwordComplete = autoValidateField(isValidPassword, password, element);
        checkLoginEnabled();
    });
});