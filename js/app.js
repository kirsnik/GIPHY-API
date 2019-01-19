$(document).ready(function () {
  
  

  var gifsArr = ["gundam", "pokemon", "outlaw star", "trigun", "full metal alchemist", "Dragon Ball"];

  function gifBtn() {
    $("#buttonsHere").empty();
    for (var i = 0; i < gifsArr.length; i++) {
      var gifButton = $("<button>");
      gifButton.addClass("gifRequest btn btn-dark");
      gifButton.attr("data-name", gifsArr[i]);
      gifButton.attr("type", "button")
      gifButton.text(gifsArr[i]);
      $("#buttonsHere").append(gifButton);
    }

  }

  function userDynamicBtn() {
    $("#addGif").on("click", function () {
      var gifRequest = $("#gifInput").val().trim();
      if (TVshows.indexOf(newTVshow)=== -1) {
      TVshows.push(newTVshow);
      renderButtons();
      }
      else {
          alert("Please type a different show"); 
      }
      $("#form").val("")
      gifsArr.push(gifRequest);
      gifBtn();
    });
  }

  function displayGifs() {
    var gifRequest = $(this).attr("data-name");
    var queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" + gifRequest + "&api_key=dc6zaTOxFJmzC&limit=5";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function (response) {
      console.log('under func response', response);
      $("#gifsHere").empty();
      var gifRequest = response.data;
      if (gifRequest == "") {
        alert("There isn't a gif for this selected button");
      }
      for (var i = 0; i < gifRequest.length; i++) {

        var gifDiv = $("<div>");
        gifDiv.addClass("sm-4");
        var gifImage = $("<img>");
        gifImage.attr("src", gifRequest[i].images.fixed_height_still.url);
        gifImage.attr("data-still", gifRequest[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", gifRequest[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifImage.attr("class", "image");
        $(gifDiv).append(gifImage);
        $("#gifsHere").append(gifDiv);

      }
    });
  }

  gifBtn();
  userDynamicBtn();
  $(document).on("click", ".gifRequest", displayGifs);
  $(document).on("click", ".image", function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }
  });

  $(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
    });
});


