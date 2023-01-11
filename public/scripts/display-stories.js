$(document).ready(function() {

  /** function that goes through an array of tweet data
 the renders them onto the #tweets-container
 */


  const renderStories = function(stories) {
    stories.forEach(story => {
      let $story = createStoryElement(story);
      $('#stories-container').prepend($story);
    });
  };

  const createStoryElement = function(storyData) {
    let  $story = $(`
    <article class = 'story'>
    <a href = '/additions/${storyData.id}'>
    <h1 class="title">${storyData.title}</h1>
    </a>
    <h3 class = "date">${storyData.date}</h3>
    <h2 class="username">${storyData.name}</h2>
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
