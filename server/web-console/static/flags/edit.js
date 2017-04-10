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
});