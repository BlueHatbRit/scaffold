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