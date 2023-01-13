$(document).ready(function() {
  $('.error').hide();
  const id  = document.getElementById("add-id").content;

  const createAdditionElement = function(additionData) {
    let  $addition = $(`
    <article class = 'addition-story'>
  <p class="username">${additionData.name}</p>
  <p>${additionData.body}</p>
  <div class = 'like-div'>
  <button class="like-button" type="submit" value = ${additionData.id} >
  <i class="fa-regular fa-heart"></i>
  </button>
  <button class="like-count" value =${additionData.id}>1</button>
  </div>
</article>`);
    return $addition;
  };

  const loadlastAddition = function() {

    $.ajax({
      url: `/api/${id}/additions`,
      type: 'GET',
      dataType:'json',
      success : function(res){
        const additionData = res.additions.pop();
        const $addition = createAdditionElement(additionData)
          $('#additions-container').prepend($addition)
      }
    })


  };
    /** checks to see if data fits the conditions for additions
  returns the error is not meet else return null **/
  const validator = (data) => {
    const truedata = decodeURIComponent(data.split("=")[1]);
    const userByID  = document.getElementById("user-id").content;

    if (!truedata || truedata === " ") return "Post cannot be empty";

    else if (truedata.length > 1000) return "Post cannot be above maximum length";

    else if (userByID === '') return "Please sign in to make a post"
    return null;
  };

  //additions form
  $("#add-form").submit(function(event) {

    event.preventDefault();
    const form =$(this).serialize();
    const actionUrl = $(this).attr('action');
    const validate = validator(form);
    if (validate) {
      $('.error>p').text(validate);
      $('.error').slideDown(300);
      return false;
    }

    //hides error div
    $('.error').slideUp(300);
    //clears text-area
    $("#add-text").val('');
    $('.counter').val(1000);
    $.ajax({
        method: 'POST',
        url: actionUrl,
        data :form,
      })
        .done((response) => {
        loadlastAddition();
      });



  })
})


