$(document).ready(function () {

  const renderStories = function (stories) {
    stories.forEach(story => {
      let $story = createStoryElement(story);
      $('#stories-container').prepend($story);
    });
  };
  const createStoryElement = function (storyData) {

    let $story = $(`
    <article class = 'story'>
    <div class = 'my-story-title'>
    <button class= 'story-button' value = ${storyData.id}>
    <h1 class="title">${storyData.title}</h1>
    </button >
    ${storyData.time_completed !== null ?
        `<h3 class = "completed"> completed <button>
      <i class="fa-regular fa-square-check"></i>
      </button></h3>`: `<h3 class = "progress"> In progress <button  value = ${storyData.id} >
      <i class="fa-regular fa-square-check"></i>
      </button></h3>` }
    </div>
    <h5 class = "username">${storyData.date}</h5>
  <p class ="content">${storyData.content}</p>

  <section id ='#additions-container' ></section>
</article>`);
    return $story;
  };

  const renderAdditions = function (additions, node) {
    $(node).prepend('<hr class="solid"> ')
    additions.forEach(addition => {
      let $addition = createAdditionElement(addition)
      $(node).append($addition)

    });
  };

  const createAdditionElement = function (additionData) {
    let $addition = `
    <article class = 'addition-story'>
  <p class="username">${additionData.name}</p>
  <p>${additionData.body}</p>
  <div class = 'like-div'>
  <button class="like-count" value =${additionData.id}>${additionData.likes}</button>
  <button class= 'like-add' value = ${additionData.id}><i class="fa-solid fa-plus"></i></button>
  </div>
</article>`;
    return $addition;
  };

  const loadMyStories = function () {

    $.ajax({
      method: 'GET',
      url: '/api/mystories'
    })
      .done((response) => {
        renderStories(response.stories);
      })

  };
  const loadAdditions = function (id, node) {

    $.ajax({
      method: 'GET',
      url: `/api/${id}/additions`
    })
      .done((response) => {

        renderAdditions(response.additions, node);
      })

  };
  loadMyStories();
  $('#stories-container').on('click', '.story-button', function (e) {
    const node = e.currentTarget.parentNode.parentNode.childNodes[7]
    if (node.innerHTML !== '') {
      $(node).slideUp(400)
      node.innerHTML = ''
      $(node).slideDown(400)
      return

    }
    else {
      const id = e.currentTarget.value;
      loadAdditions(id, node);
    }
  })
  //add button
  $('#stories-container').on('click', '.like-add', function (e) {
    const buttonValue = e.target.parentNode.value;
    const storyid = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].value;
    $.ajax({
      method: 'POST',
      url: `/api/${buttonValue}/additions`,
      data: { story_id: storyid }
    })
      .done((response) => {
        console.log('done')
        $('#stories-container').empty()
        loadMyStories();
      })
  });

  //complete button
  $('#stories-container').on('click', '.progress button', function (e) {
    const buttonValue = e.currentTarget.value;
    $.ajax({
      url: "/completed",
      type: "POST",
      data: {
        'story_id': buttonValue,
      },
      success: function (data) {
        console.log('hello')
        location.reload();
      }
    });

  })

})


