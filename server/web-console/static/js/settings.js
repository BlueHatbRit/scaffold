$(function() {
    const nameElementTag = '#name';
    const tAndCsElementTag = '#tAndCs';

    $('#settings-form').submit(function(e) {
        e.preventDefault();

        let data = [
            {
                key: 'name',
                value: $(nameElementTag).val()
            },
            {
                key: 'tAndCs',
                value: $(tAndCsElementTag).val()
            }
        ];

        console.log(data);

        $.ajax({
            url: '/settings',
            type: 'PUT',
            data: {settings: data},
            success: function(e) {
                console.log('done');
            },
            error: function(e) {
                console.log('error');
                console.log(e);
            }
        })
    });
});