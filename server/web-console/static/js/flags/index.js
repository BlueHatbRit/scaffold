$(function() {
  $(".delete-btn").each(function() {
    let element = $(this);
    element.click(function(e) {
      // Remove focus
      e.target.blur();

      let flagName = $(e.target).val();

      $.ajax({
        url: "/flags/" + flagName,
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
