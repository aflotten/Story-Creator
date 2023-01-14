$(document).ready(function() {

  //getting the id for input field
  const additionInput = $('#add-text');

  /*checks charater count present in the input field
  if over 1000 color changes red */
  $('main').on('input',additionInput, (e) => {

    const counter = e.target.closest('form').children[1].children[0];
    const addition = e.target.value.length;
    const newLength = 1000 - addition;
    if (newLength >= 0) {

      $(counter).removeClass('over-counter');
    } else {
      $(counter).addClass('over-counter');
    }
    counter.value = newLength;
  });
});
