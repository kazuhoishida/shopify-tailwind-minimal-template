// src/js/menu-accordion.js
$(function() {
  $(".accordionBtn").next().hide();
  $(".accordionBtn").click(function(e) {
    e.preventDefault();
    if ($(this).next().not(":animated").length >= 1) {
      $(this).toggleClass("open");
      $(this).next().slideToggle();
    }
  });
});
