$(document).ready(function() {

  //getting the id for input field
  const additionInput = $('#add-text');

  /*checks charater count present in the input field
  if over 1000 color changes red */
  additionInput.on('input', () => {
    const counter = additionInput.closest('form').children('div').children('output');

    const addition = additionInput.val();
    const newLength = 1000 - addition.length;

    if (newLength >= 0) {

      counter.removeClass('over-counter');
    } else {
      counter.addClass('over-counter');
    }
    counter.val(newLength);
  });
});
