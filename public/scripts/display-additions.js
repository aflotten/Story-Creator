$(document).ready(function() {
  const id  = document.getElementById("filter").value;
  console.log(id);
    const renderAdditions = function(additions) {
      additions.forEach(addition => {
        let $addition = createAdditionElement(addition);
        $('#additions-container').prepend($addition);
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
    })
  }
  loadAddition();
  loadStory();
});
