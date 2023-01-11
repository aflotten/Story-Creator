$(document).ready(function() {

  const id  = document.getElementById("add-id").content;
  const userByID  = document.getElementById("user-id").content;
  $('#like-error').hide();

    const renderAdditions = function(additions) {
      additions.forEach(addition => {
        let $addition = createAdditionElement(addition)
        $('#additions-container').prepend($addition)
      });
    };

    const createStoryElement = function(storyData) {
      let  $story = $(`
      <article class = 'story'>
      <h1 class="title">${storyData.title}</h1>
      <h3 class = "date">${storyData.date}</h3>
      <h2 class="username">${storyData.name}</h2>
    <p class ="content">${storyData.content}</p>

  </article>`);
      return $story;
    };

    const createAdditionElement = function(additionData) {
      let  $addition = $(`
      <article class = 'addition-story'>
    <p class="username">${additionData.name}</p>
    <p>${additionData.body}</p>
    <div class = 'like-div'>
    <button class="like-button" type="submit" value = ${additionData.id} >
    <i class="fa-regular fa-heart"></i>
    </button>
    <button class="like-count" value =${additionData.id}>${additionData.likes}</button>
    </div>
  </article>`);
      return $addition;
    };

    const loadAdditions = function() {

      $.ajax({
        method: 'GET',
        url: `/api/${id}/additions`
      })
      .done((response) => {
        renderAdditions(response.additions);
      })

    };
  const loadStory = function(){
    $.ajax({
      method: 'GET',
      url: `/api/${id}/story`
    })
    .done((response) => {
      let $story = createStoryElement(response[0]);
        $('main').prepend($story);
        loadAdditions();
    })
  }





  loadStory();


  $('#additions-container').on('click','.like-button',function(e){

    const thisId=e.currentTarget.value;
    if (userByID === '') {
      $('#like-error>p').text('Like this Post ? Sign in');
      $('#like-error').slideDown(300).delay( 1000 ).slideUp(300);

      return false;
    }
    //hides error div
    $('#like-error').slideUp(300);

    $.ajax({
      method: "POST",
      url: `http://localhost:8080/additions/likes/${thisId}`,
      success: function(data) {
        console.log("==========", data);
        const {count} = data;
        console.log(count);
        const elements = document.querySelectorAll(".like-count");
            for (i of elements) {

              if(i.value === thisId){
                i.innerHTML = Number(count);
              }
        }
      }
    })
  })
});
