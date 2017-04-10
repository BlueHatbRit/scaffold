$(function() {
    let nameComplete = false;

    function checkCreateEnabled() {
        let button = $('#add-group-btn');

        // Description is optional
        if (nameComplete) {
            button.prop('disabled', false);
        } else {
            button.prop('disabled', true)
        }
    }

    $('#group-name').on('input', function(e) {
        e.target.value = warpFlagName(e.target.value);

        // If the length is correct then name is complete
        // as we've warped everything else.
        if (e.target.value.length > 4) {
            nameComplete = true;
        } else {
            nameComplete = false;
        }

        checkCreateEnabled();
    });
});