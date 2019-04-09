$(document).ready(function(){
  // When page loads: 
// user sees search form, buttons.
// when users click on button giphs are displayed for the topic inside the button 
// when user searches a new button is created and giphs are displayed for that topic 

// array of buttons 
  var topicArr = [];
  //  other global variables: url paths
 var stillURL;
 var animatedURL;
// function to display buttons 
  // function needs to take the input inside the search area and then add a button
  function displayBtn (topic, number){
    
    if (number > 25){
      return false;
    }

      var $newbtn = $("<button>")
      .addClass("btn btn-primary gifBtn")
      .attr("type", "button")
      .attr("data-topic", topic)
      .attr("data-searchNum", number)
      .text(topic + " - " + number);

      $("#button-area").prepend($newbtn);
  }

  topicArr.forEach(function (item){
    displayBtn(item);
  })
  // // a click event for the generated buttons 

  $(document).on("click", ".gifBtn", function(){
    // clear the #giphyArea
    $("#giphyArea").empty();
    var changeThatNumber = $("#numInput").val().trim();
    var $dataTopic = $(this).attr("data-topic")

    
    if (changeThatNumber === ""){
      var $dataNumber = $(this).attr("data-searchNum");
    }
    else {
      $dataNumber = changeThatNumber;

      /* change the data-attr of the .gifBtn to the new number from the form input
        take the that number and print it to the page
      */

      $(this).attr("data-searchNum", $dataNumber)
      .text(`${$dataTopic} - ${$dataNumber}`);
    }
    // create variable to save the data topic
    
    
  
    
    // when the user clicks on the button the page will add to the gif display area
    searchForGiphy($dataTopic, $dataNumber);
  })
  // // click event for the search (submit) button
  $("#searchBtn").on("click", function(){
    event.preventDefault();
    // take the information in the input field and save it as a variable
    $("#giphyArea").empty();
    var searchInputVar = $("#searchTxt").val();
    var numInputVar = $("#numInput").val();

    if (searchInputVar === "" || numInputVar === ""){
      return false;
    }
    console.log(searchInputVar, numInputVar);
    // display the new button
    displayBtn(searchInputVar, numInputVar);
    
    // have the variable be able to run through the ajax search function
    searchForGiphy(searchInputVar, numInputVar);

    // clear the search field
    $("#searchTxt").val("");
    $("#numInput").val("");
  
  })

  function searchForGiphy (searchField, numField){
    if (numField >25){
      alert("You searched for too many results. Please choose 1-25")
      return false;
    }
    var searchTermVar = searchField;
    var queryURL = "https://api.giphy.com/v1/gifs/search?"
    var parameters = {"api_key":"pWCQRgiCN7dmL6YFmnlCyJz6px01doDw"};
    var offsetNum = Math.floor((Math.random()*10));
    console.log(offsetNum)
    parameters.q = searchTermVar;
    parameters.limit = numField;
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

  $("#clearBtn").on("click", function(){
    $("#button-area").empty();
    $("#giphyArea").empty();
  })
  
});