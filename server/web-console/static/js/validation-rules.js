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

function isValidPercentage(value) {
    return (value <= 100 && value >= 0 && value !== '');
}

function isValidFlagName(name) {
    const maxLength = 51;
    const minLength = 4;
    let isValid = true;

    // Cannot contain spaces
    if (name.indexOf(' ') >= 0) {
        isValid = false;
    }

    // Cannot contain digits
    if (name.match(/\d/g)) {
        isValid = false;
    }

    // Cannot contain punctuation
    if (name.match(/[.,\/#!$%\^&\*;:{}=\_`'~()@£+\[\]"|\\<>?±§]/g)) {
        isValid = false;
    }

    // Can't contain double hyphen
    if (name.indexOf('--') >= 0) {
        isValid = false;
    }
    
    if (name.length < minLength || name.length > maxLength) {
        isValid = false;
    }

    return isValid;
}

function isValidGroupName(name) {
    // Same rules apply!
    return isValidFlagName(name);
}