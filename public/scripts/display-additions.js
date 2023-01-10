$(document).ready(function() {

  const count =0;
  const id  = document.getElementById("add-id").content;
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
    <button class="like-count" value =${additionData.id}>1</button>
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
  $('#additions-container').on('click','.like-button',function(e){

    const thisId=e.currentTarget.value;

    $.ajax({
      method: "GET",
      url: `http://localhost:8080/additions/likes/${thisId}`,
      //dataType: JSON,
      success: function(data) {
        const {count} = data;
        const elements = document.querySelectorAll(".like-count");
            for (i of elements) {

              if(i.value === thisId){
                // console.log(i);
                i.innerHTML = 2;
              }
        }
        // console.log(Number(count) + 1);
        // $(".like-count").text(Number(count) + 1);
        // console.log("DATA IS HERE:", data);
      }
    })
  })
});
