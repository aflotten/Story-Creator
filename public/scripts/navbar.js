$(document).ready(function() {
  const $nav = $('#navbar');
  const $top =$('#top');

  let prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;

//checks if scrolling down then hides navbar if scrolling up show nav bar
    if (prevScrollpos > currentScrollPos) {
      $nav.css({'top':'0'});
      $top.css({'display':'none'})
    } else {
      $nav.css({'top':'-5rem'});
      $top.css({'display':'block'})

    }
    prevScrollpos = currentScrollPos;
};
// scrolls to the top on arrow button click
  $top.click(function(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  })
});
