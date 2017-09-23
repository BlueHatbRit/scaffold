$(function() {
  $(".delete-btn").each(function() {
    let element = $(this);

    element.click(function(e) {
      e.target.blur();

      let groupId = $(e.target).val();
      console.log(groupId);

      $.ajax({
        url: "/groups/" + groupId,
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
