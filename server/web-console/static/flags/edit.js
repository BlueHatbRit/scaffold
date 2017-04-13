$(function() {
    $("#flag-description").on('input', function(e) {
        const maxLength = 120;
        let value = e.target.value;

        // Restrict to the max length
        if (value.length > maxLength) {
            value = value.substring(0, maxLength);
        }

        e.target.value = value;
    });

    $('#population').on('input', function(e) {
        let value = e.target.value;
        let element = '#population';

        autoValidateField(isValidPercentage, value, element);
        checkFormSubmittability();
    });

    $('#population').on('blur', function(e) {
        if (e.target.value === '') {
            e.target.value = 0;
            checkFormSubmittability();
        }
    });

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
});