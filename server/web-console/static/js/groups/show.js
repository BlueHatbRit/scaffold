$(function() {
  $(".remove-btn").each(function() {
    let element = $(this);

    element.click(function(e) {
      e.target.blur();

      let groupUser = $(e.target).val();

      $.ajax({
        url: "/groups/" + groupUser,
        type: "DELETE",
        success: function(e) {
          location.reload();
        },
        error: function(e) {
          console.log(e);
        }
      });
    });
  });
});
