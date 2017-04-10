$(function() {
    let emailComplete = false;
    let passwordComplete = false;
    let confirmPassComplete = false;

    $("input[name='email']").change(function(e) {
        let email = e.target.value;
        let element = "input[name='email']";

        emailComplete = autoValidateField(isValidEmail, email, element);
        checkSubmitEnabled();
    });

    $("input[name='password']").change(function(e) {
        let password = e.target.value;
        let element = "input[name='password']";

        passwordComplete = autoValidateField(isValidPassword, password, element);
        checkSubmitEnabled();
    });

    $("input[name='confirmPassword']").change(function(e) {
        let passwords = [
            $("input[name='password']").val(),
            e.target.value
        ];
        let element = "input[name='confirmPassword']";
        
        confirmPassComplete = autoValidateField(bothPasswordsAreTheSame, passwords, element);
        checkSubmitEnabled();
    });

    function checkSubmitEnabled() {
        let button = $('#create-account-btn');
        if (emailComplete && passwordComplete && confirmPassComplete) {
            button.prop('disabled', false);
        } else {
            button.prop('disabled', true)
        }
    }
});