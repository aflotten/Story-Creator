$(document).ready(function() {
  //id for the story
  const id  = document.getElementById("add-id").content;

  //logged in user id
  const userByID  = document.getElementById("user-id").content;

  //hides error div
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
        <h1 class="title-add">${storyData.title}</h1>
        <h5 class = "username">${storyData.name} - ${storyData.date}</h5>
        <p class ="content">${storyData.content}</p>
      </article>
      ${storyData.time_completed === null ?`<h3 class="add-comment-title">Story Additions</h3>
      <form id="add-form" method="POST" action="/additions/${id}" >
        <textarea placeholder="Add to story" name="addition" id="add-text"></textarea>
        <div>
          <output name="counter" class="counter" for="add-text">1000</output>
          <button class="add-button" type="submit">Post</button>
        </div>
      </form>` : ''}
  `)


    return $story;
   }

    const createAdditionElement = function(additionData) {
      let  $addition = $(`
      <article class = 'addition-story'>
    <p class="username">${additionData.name} - ${additionData.date}</p>
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
        console.log(response)
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

// functions for displaying an error on like and posting likes to database
  $('#additions-container').on('click','.like-button',function(e){

    const thisId=e.currentTarget.value;
    if (userByID === '') {
      $('#like-error>p').text('Like this Post ? Sign in');
      $('#like-error').slideDown(300).delay( 1000 ).slideUp(300);

      return false;
    }
    //hides error div
    $('#like-error').slideUp(300);
    //if there is no issue post to the database
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
