$(document).ready(function(){
  // When page loads: 
// user sees search form, buttons.
// when users click on button giphs are displayed for the topic inside the button 
// when user searches a new button is created and giphs are displayed for that topic 

// array of buttons 
  var topicArr = ["Cat", "Lion", "Snow Leopard"];
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
    parameters.q = searchTermVar;
    parameters.limit = 10;
    parameters.rating = "g";
    $.ajax ({
      url: queryURL+$.param(parameters),
      method: "GET"
    }).then(function(giphyResult){
      console.log(giphyResult);
      // things needed: still image, animated image, rating
      // animated downsized image url path: giphyResult.data[i].images.downsized.url
      // still downsized image url path: giphyResult.data[i].images.downsized_still.url
      for (i=0; i < parameters.limit ; i++){
        animatedURL = giphyResult.data[i].images.fixed_width_small.url;
        stillURL = giphyResult.data[i].images.fixed_width_small_still.url;
      
      var $resultImg = $("<img>")
      .addClass(".imgGifResult")
      .attr("src", stillURL)
      .attr("data-still", stillURL)
      .attr("data-animate", animatedURL)
      .attr("data-state", "still");

      $("#giphyArea").append($resultImg);
      }
      
    })
  }
  function stillToAnimated (url){
    var dataForStillToAnimation = $(this).attr("data-topic")
    
  }
});