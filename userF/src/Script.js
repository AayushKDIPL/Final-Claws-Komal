$(document).ready(function() {
    $('.navbar-toggler').on('click', function() {
      $(this).toggleClass('collapsed');
      $('.navbar-collapse').toggleClass('show');
    });
  });