$(document).ready(function(){
  // When page loads: 
// user sees search form, buttons.
// when users click on button giphs are displayed for the topic inside the button 
// when user searches a new button is created and giphs are displayed for that topic 

// array of buttons 
  var topicArr = ["Cat", "Lion", "Snow Leopard"];
  //  other global variables: search input field
 
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
    // when the user clicks on the button the page will add to the gif display area
  })
  // // click event for the search (submit) button
  $("#searchBtn").on("click", function(){
    event.preventDefault();
    // take the information in the input field and save it as a variable
    var searchInputVar = $("#searchTxt").val()
    console.log(searchInputVar);
    // display the new button
    displayBtn(searchInputVar);
    // clear the search field
    $("#searchTxt").val("");
    // have the variable be able to run through the ajax search function
    searchForGiphy(searchInputVar);
  })

  function searchForGiphy (searchField){
    var searchTermVar = searchField;
    var queryURL = "https://api.giphy.com/v1/gifs/search?"
    var parameters = {"api_key":"pWCQRgiCN7dmL6YFmnlCyJz6px01doDw"};
    parameters.q = searchTermVar;
    $.ajax ({
      url: queryURL+$.param(parameters),
      method: "GET"
    }).then(function(giphyResult){
      console.log(giphyResult);
    })
  }
});