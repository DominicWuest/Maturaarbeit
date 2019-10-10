$(document).ready(function() {

  $('textarea').focus(function() {
    $(this).css("background-color", "#DDD")
  });

  $('textarea').blur(function() {
    $(this).css("background-color", "#FFF")
  });

  $('input[type=text]').focus(function() {
    $(this).css("background-color", "#DDD")
  });

  $('input[type=text]').blur(function() {
    $(this).css("background-color", "#FFF")
  });

});
