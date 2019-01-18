//The ready event occurs when the DOM (document object model) has been loaded
$(document).ready(function () {

  $(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
  });

  gifBtn();
  userDynamicBtn();

  // gif array that will have the inital button set.
  var gifsArr = ["gundam", "pokemon", "outlaw star", "trigun", "full metal alchemist", "Dragon Ball"];

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
        alert("Thee isn't a gif for this selected button");
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

  //function that creates gif buttons from the gifsArr, assigns class, attributes, and text
  function gifBtn() {
    $("#buttonsHere").empty(); //empties the page to keep duplicates from being made
    for (var i = 0; i < gifsArr.length; i++) {
      var gifButton = $("<button>");
      gifButton.addClass("gifRequest btn btn-dark");
      gifButton.attr("data-name", gifsArr[i]);
      gifButton.attr("type", "button")
      gifButton.text(gifsArr[i]);
      $("#buttonsHere").append(gifButton);
    }

  }



  //Allows the user to input a search, push into the gifsArr which is then pulls into the gifBtn Function
  function userDynamicBtn() {
    $("#addGif").on("click", function () {
      var gifRequest = $("#gifInput").val().trim();
      //if (find_duplicate_in_array(gifsArr) == gifRequest){
      //  alert("You have already chosen that, choose another.");
      //  input.value = false;} 
      if (gifRequest == "" /*|| gifRequest == find_duplicate_in_array(gifsArr) need to figure out how to tell if there is a duplicate request*/ ) {
        input.value = false;
      }
      $('form').val("");
      gifsArr.push(gifRequest);
      gifBtn();
      return false;
    });
  }



  //Allows the user to input a search, push into the gifsArr which is then pulls into the gifBtn Function
  function userDynamicBtn() {
    $("#addGif").on("click", function () {
      var gifRequest = $("#gifInput").val().trim();
      if (gifsArr.indexOf(gifRequest) === -1) {
        gifsArr.push(gifRequest);
        renderButtons();
      } else {
        alert("Please type a different show");
      }
      gifBtn();
    });
  }

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

});