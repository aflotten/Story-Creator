$(document).ready(function() {

  //getting the id for input field
  const toggleButton = $('.toggle-button');
  const mobileMenu = $('.mobile-menu')
  toggleButton.on('click', () => {
    mobileMenu.toggleClass('active');
  })
  //hides mobile menu on scroll
  document.addEventListener('scroll', function (event) {
    mobileMenu.removeClass( "active" );
  });
});
