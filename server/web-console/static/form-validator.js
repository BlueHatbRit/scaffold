function autoValidateField(isValid, value, elementTag) {
    let element = $(elementTag);
    let group = element.parent().parent();

    if (element.val() !== '' && !isValid(value)) {
        // Add error style classes
        group.addClass('errored');

        // Hide the note and display the error
        group.find('.note').hide();
        group.find('.error').show();
    } else {
        // Reset empty or valid fields
        group.removeClass('errored');

        group.find('.note').show();
        group.find('.error').hide();

        // If it's not empty and valid then say it's complete
        if (value !== '') {
            return true;
        }
    }

    // If it's not valid or empty then say it's not complete
    return false;
}

function warpFlagName(name) {
    const maxLength = 50;

    // Replace spaces with hyphens
    name = name.replace(' ', '-');

    // Don't allow numbers
    name = name.replace(/\d/g, '');

    // Don't allow punctuation
    name = name.replace(/[.,\/#!$%\^&\*;:{}=\_`'~()@£+\[\]"|\\<>?±§]/g, '');

    // Ensure we don't end up with a double hypen from
    // replacements and user entry
    name = name.replace('--', '-');

    // Restrict to the max length
    if (name.length > maxLength) {
        name = name.substring(0, maxLength);
    }

    return name;
}

function wrapGroupName(name) {
    // Same rules as the flag!
    return warpFlagName(name);
}