$(document).ready(function(){
  // When page loads: 
// user sees search form, buttons.
// when users click on button giphs are displayed for the topic inside the button 
// when user searches a new button is created and giphs are displayed for that topic 

// array of buttons 
  var topicArr = ["Grumpy Cat", "Pusheen", "Kim Possible"];
  //  other global variables: url paths
 var stillURL;
 var animatedURL;
// function to display buttons 
  // function needs to take the input inside the search area and then add a button
  function displayBtn (topic){
      var $newbtn = $("<button>")
      .addClass("gifBtn mx-3 my-3")
      .attr("data-topic", topic)
      .text(topic);

      $("#button-area").prepend($newbtn);
  }

  topicArr.forEach(function (item){
    displayBtn(item);
  })
  // // a click event for the generated buttons 

  $(document).on("click", ".gifBtn", function(){
    // clear the #giphyArea
    $("#giphyArea").empty();

    // create variable to save the data topic
    var $dataTopic = $(this).attr("data-topic")
    
    // when the user clicks on the button the page will add to the gif display area
    searchForGiphy($dataTopic);
  })
  // // click event for the search (submit) button
  $("#searchBtn").on("click", function(){
    event.preventDefault();
    // take the information in the input field and save it as a variable
    $("#giphyArea").empty();
    var searchInputVar = $("#searchTxt").val()
    console.log(searchInputVar);
    // display the new button
    displayBtn(searchInputVar);
    
    // have the variable be able to run through the ajax search function
    searchForGiphy(searchInputVar);

    // clear the search field
    $("#searchTxt").val("");
  })

  function searchForGiphy (searchField){
    var searchTermVar = searchField;
    var queryURL = "https://api.giphy.com/v1/gifs/search?"
    var parameters = {"api_key":"pWCQRgiCN7dmL6YFmnlCyJz6px01doDw"};
    var offsetNum = Math.floor((Math.random()*10));
    console.log(offsetNum)
    parameters.q = searchTermVar;
    parameters.limit = 10;
    parameters.rating = "pg"
    parameters.offset = offsetNum;
    $.ajax ({
      url: queryURL+$.param(parameters),
      method: "GET"
    }).then(function(giphyResult){
      console.log(giphyResult);
      // things needed: still image, animated image, rating
      // animated downsized image url path: giphyResult.data[i].images.downsized.url
      // still downsized image url path: giphyResult.data[i].images.downsized_still.url
      for (i=0; i < parameters.limit ; i++){
        animatedURL = giphyResult.data[i].images.downsized.url;
        stillURL = giphyResult.data[i].images.downsized_still.url;
      
      var $resultImg = $("<img>")
      .addClass(".imgGifResult my-3 mx-3")
      .attr("src", stillURL)
      .attr("data-still", stillURL)
      .attr("data-animate", animatedURL)
      .attr("data-state", "still");

      $("#giphyArea").append($resultImg);
      };
      
    });
  };
  function stillToAnimated (url){
    var dataStill = $(this).attr("data-still");
    var dataAnimated = $(this).attr("data-animate");
    var dataState = $(this).attr("data-state");
    console.log("I'm a function")

    if (dataState === "still"){
      srcImage = $(this).attr("src", dataAnimated)
      $(this).attr("data-state", "animate")
    }

    else {
      srcImage = $(this).attr("src", dataStill);
      $(this).attr("data-state", "still");
    };
  };

  $(document).on("click", "img", stillToAnimated);

    // $(document).on("click", ".imgGifResult", function(){
    //   var state = $(this).attr("data-state")
    //   console.log("you clicked me")
    //   if (state === "still"){
    //     $(this).attr("src", $(this).attr("data-animate"));
    //     $(this).attr("data-state", "animate");
    //   }
    //   else {
    //     $(this).attr("src", $(this).attr("data-still"));
    //     $(this).attr("data-state", "still");
    //   }
    // });
  
});