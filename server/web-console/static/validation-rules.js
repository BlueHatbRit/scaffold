function isValidEmail(email) {
    let isValid = true;

    // Doesn't contain @ symbol
    if (email.indexOf('@') == -1) {
        isValid = false;
    }

    return isValid;
}

function isValidPassword(password) {
    function hasNumber(str) {
        return /\d/.test(str);
    }

    let isValid = true;

    if (password.length < 7) {
        isValid = false;
    }

    if (!hasNumber(password)) {
        console.log('no numbers');
        isValid = false;
    }

    return isValid;
}

function bothPasswordsAreTheSame(passwords) {
    if (passwords[0] == passwords[1]) {
        return true;
    }

    return false;
}