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
    <button class= 'story-button' value = ${storyData.id}>
    <h1 class="title">${storyData.title}</h1>
    </button>
    <h3 class = "date">${storyData.date}</h3>
  <p class ="content">${storyData.content}</p>
  <section id ='#additions-container' ></section>
</article>`);
    return $story;
  };

  const renderAdditions = function(additions,node) {
    additions.forEach(addition => {
      let $addition = createAdditionElement(addition)
      //  this is the issue prepend isnt working returning an object object
      node.prepend($addition)
    });
  };

  const createAdditionElement = function(additionData) {
    console.log(additionData);
    let  $addition = $(`
    <article class = 'addition-story'>
  <p class="username">${additionData.name}</p>
  <p>${additionData.body}</p>
  <div class = 'like-div'>
  <button class="like-button" type="submit" value = ${additionData.id} >
  <i class="fa-regular fa-heart"></i>
  </button>
  <button class="like-count" value =${additionData.id}>${additionData.likes}</button>
  <button value = ${additionData.id}><i class="fa-solid fa-plus"></i></button>
  </div>
</article>`);
    return $addition;
  };

  const loadMyStories = function() {

    $.ajax({
      method: 'GET',
      url: '/api/mystories'
    })
    .done((response) => {
      renderStories(response.stories);
    })

  };
  const loadAdditions = function(id,node) {

    $.ajax({
      method: 'GET',
      url: `/api/${id}/additions`
    })
    .done((response) => {

      renderAdditions(response.additions,node);
    })

  };
loadMyStories();
$('#stories-container').on('click','.story-button',function(e){
  const node = e.currentTarget.parentNode.childNodes[7]
  const id =e.currentTarget.value;
  loadAdditions(id,node);
})
})
