$(function() {
    $('.remove-btn').each(function() {
        let element = $(this);

        element.click(function(e) {
            e.target.blur();

            let groupUser = $(e.target).val();
            console.log(groupUser);

            $.ajax({
                url: '/groups/' + groupUser,
                type: 'DELETE',
                success: function(e) {
                    console.log('done');
                    //location.reload();
                },
                error: function(e) {
                    console.log(e);
                }
            });
        });
    });
});