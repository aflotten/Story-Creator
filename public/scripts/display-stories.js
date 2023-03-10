$(document).ready(function() {

  const renderStories = function(stories) {
    stories.forEach(story => {
      let $story = createStoryElement(story);
      $('#stories-container').prepend($story);
    });
  };

  const createStoryElement = function(storyData) {
    let  $story = $(`
    <article class = 'story'>
    <div class = 'story-title'>
    <a href = '/additions/${storyData.id}'>
    <h1 class="title">${storyData.title}</h1>
    </a>
    ${storyData.time_completed !== null ?
      '<h4 class= "completed"> completed</h4>':'<h4> In progress</h4>' }
      </div>
      <h5 class = "username">${storyData.name} - ${storyData.date}</h5>
  <p class ="content">${storyData.content}</p>
</article>`);
    return $story;
  };

  const loadStories = function() {

    $.ajax({
      method: 'GET',
      url: '/api/stories'
    })
    .done((response) => {
      renderStories(response.stories);
    })

  };
loadStories();

});
