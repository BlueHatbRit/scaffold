$(function() {
    let nameComplete = false;

    function checkCreateEnabled() {
        let button = $('#create-flag-btn');

        // Description is optional
        if (nameComplete) {
            button.prop('disabled', false);
        } else {
            button.prop('disabled', true)
        }
    }

    // Warp the input of the flag name on the fly.
    // Note: This function isn't very solid, for example
    // it totally ignores languages with other character sets
    // but it'll do for now.
    $("#flag-name").on('input', function(e) {
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

    $("#flag-description").on('input', function(e) {
        const maxLength = 120;
        let value = e.target.value;

        // Restrict to the max length
        if (value.length > maxLength) {
            value = value.substring(0, maxLength);
        }

        e.target.value = value;
    });
});