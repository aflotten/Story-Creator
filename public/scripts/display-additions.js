$(document).ready(function() {

  const count =0;
  const id  = document.getElementById("filter").content;
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
    <button class="likes-button" type="submit" value = ${additionData.id} >
    <i class="fa-regular fa-heart"></i>
    </button>
    <p class="like-count">1</p>
    </div>
  </article>`);
      return $addition;
    };

    const loadAddition = function() {

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
        loadAddition();
    })
  }





  loadStory();

  // // const button_val=document.querySelector(".likes-button").val;
  // const article = $('.like-story')
  // const butt = $('.likes-button')
  $('#additions-container').on('click','.likes-button',function(e){
    const button=document.querySelector(".likes-button");
    const thisId = button.value;
    $.ajax({
      method: "GET",
      url: `http://localhost:8080/additions/likes/${thisId}`,
      //dataType: JSON,
      success: function(data) {
        const {count} = data;
        console.log(Number(count) + 1);
        $(".like-count").text(Number(count) + 1);
        console.log("DATA IS HERE:", data);
      }
    })
  })

  // button.addEventListener('click', function(e) {
  //   console.log('hee')
  // })

  button.addEventListener('click', function(e) {
    console.log("ABC");

  })
});
