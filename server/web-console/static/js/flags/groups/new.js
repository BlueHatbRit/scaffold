$(function() {
    $('#group-name').on('input', function(e) {
        e.target.value = warpGroupName(e.target.value);

        // If the length is correct then name is complete
        // as we've warped everything else.
        let nameValid = isValidGroupName(e.target.value);

        $('#add-group-btn').prop('disabled', !nameValid);
    });
});