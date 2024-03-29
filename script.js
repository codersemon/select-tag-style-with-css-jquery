$("select#logistical_tasks").each(function () {
  var $this = $(this),
    selectOptions = $(this).children("option").length;

  $this.addClass("hide-select");
  $this.wrap('<div class="select"></div>');
  $this.after('<div class="custom-select"></div>');

  var $customSelect = $this.next("div.custom-select");
  $customSelect.text($this.children("option").eq(0).text());

  var $optionlist = $("<ul />", {
    class: "select-options",
  }).insertAfter($customSelect);

  for (var i = 0; i < selectOptions; i++) {
    $("<li />", {
      text: $this.children("option").eq(i).text(),
      rel: $this.children("option").eq(i).val(),
    }).appendTo($optionlist);
  }

  var $optionlistItems = $optionlist.children("li");

  $customSelect.click(function (e) {
    e.stopPropagation();
    $("div.custom-select.active")
      .not(this)
      .each(function () {
        $(this).removeClass("active").next("ul.select-options").hide();
      });
    $(this).toggleClass("active").next("ul.select-options").slideToggle();
  });

  $optionlistItems.click(function (e) {
    e.stopPropagation();
    $customSelect.text($(this).text()).removeClass("active");
    $this.val($(this).attr("rel"));
    $optionlist.hide();
  });

  $(document).click(function () {
    $customSelect.removeClass("active");
    $optionlist.hide();
  });
});
