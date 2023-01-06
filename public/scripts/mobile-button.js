$(document).ready(function() {

  //getting the id for input field
  const toggleButton = $('.toggle-button');
  const mobileMenu = $('.mobile-menu')
  toggleButton.on('click', () => {
    mobileMenu.toggleClass('active');
    console.log("hello")
  })
});
