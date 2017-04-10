$(function() {
    let emailComplete = false;
    let passwordComplete = false;
    let confirmPassComplete = false;

    function isValidEmail(email) {
        let isValid = true;

        // Doesn't contain @ symbol
        if (email.indexOf('@') == -1) {
            isValid = false;
        }

        return isValid;
    }

    $("input[name='email']").change(function(e) {
        let email = e.target.value;
        let element = "input[name='email']";

        emailComplete = autoValidateField(isValidEmail, email, element);
        checkSubmitEnabled();
    });

    function hasNumber(str) {
        return /\d/.test(str);
    }

    function isValidPassword(password) {
        let isValid = true;

        if (password.length < 7) {
            isValid = false;
        }

        if (!hasNumber(password)) {
            isValid = false;
            console.log('no numbers');
        }

        return isValid;
    }

    $("input[name='password']").change(function(e) {
        let password = e.target.value;
        let element = "input[name='password']";

        passwordComplete = autoValidateField(isValidPassword, password, element);
        checkSubmitEnabled();
    });

    function bothPasswordsAreTheSame(passwords) {
        if (passwords[0] == passwords[1]) {
            return true;
        }

        return false;
    }

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