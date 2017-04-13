$(function() {
    // Warp the description
    $("#flag-description").on('input', function(e) {
        const maxLength = 120;
        let value = e.target.value;

        // Restrict to the max length
        if (value.length > maxLength) {
            value = value.substring(0, maxLength);
        }

        e.target.value = value;
    });

    // Display population errors on input because
    // it's such a simple field.
    $('#population').on('input', function(e) {
        let value = e.target.value;
        let element = '#population';

        autoValidateField(isValidPercentage, value, element);
        checkFormSubmittability();
    });

    // Ensure population defaults back to 0, then
    // check the form status.
    $('#population').on('blur', function(e) {
        if (e.target.value === '') {
            e.target.value = 0;
            checkFormSubmittability();
        }
    });

    // Check whether the form submit button should be enabled
    function checkFormSubmittability() {
        let popValue = $('#population').val();
        let popIsValid = isValidPercentage(popValue);

        let editBtn = $('#edit-flag-btn');
        if (popIsValid) {
            $('#edit-flag-btn').prop('disabled', false);
        } else {
            $('#edit-flag-btn').prop('disabled', true);
        }
    }
    $('input').on('input', checkFormSubmittability);
});