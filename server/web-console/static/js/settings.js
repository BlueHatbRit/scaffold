$(function() {
  const nameElementTag = "#name";
  const termsElementTag = "#terms";
  const submitButton = "#save-button";

  function isValidAppName(name) {
    return name.length > 0 && name.length < 51;
  }

  $(nameElementTag).change(function(e) {
    let appName = e.target.value;
    autoValidateField(isValidAppName, appName, nameElementTag);
  });

  $("input").on("input", function(e) {
    let appName = $(nameElementTag).val();
    let nameIsValid = isValidAppName(appName);

    if (nameIsValid) {
      $(submitButton).prop("disabled", false);
    } else {
      $(submitButton).prop("disabled", true);
    }
  });

  $("#settings-form").submit(function(e) {
    e.preventDefault();

    let data = [
      {
        key: "name",
        value: $(nameElementTag).val()
      },
      {
        key: "terms",
        value: $(termsElementTag).val()
      }
    ];

    $.ajax({
      url: "/settings",
      type: "PUT",
      data: { settings: data },
      success: function(e) {
        location.reload();
      },
      error: function(e) {
        console.log(e);
      }
    });
  });
});
