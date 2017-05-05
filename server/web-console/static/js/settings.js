$(function() {
    const nameElementTag = '#name';
    const tAndCsElementTag = '#terms';

    $('#settings-form').submit(function(e) {
        e.preventDefault();

        let data = [
            {
                key: 'name',
                value: $(nameElementTag).val()
            },
            {
                key: 'terms',
                value: $(tAndCsElementTag).val()
            }
        ];
        
        $.ajax({
            url: '/settings',
            type: 'PUT',
            data: {settings: data},
            success: function(e) {
                console.log('done');
                location.reload();
            },
            error: function(e) {
                console.log('error');
                console.log(e);
            }
        })
    });
});