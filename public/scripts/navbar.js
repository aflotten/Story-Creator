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
      console.log(window.pageYOffset);
    } else {
      $nav.css({'top':'-5rem'});
      $top.css({'display':'block'})
    // console.log(window.pageYOffset);
    }
    prevScrollpos = currentScrollPos;
};
  $top.click(function(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  })
});
