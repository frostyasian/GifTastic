// Topics variable
var bands = [
  "Stevie Wonder",
  "A Day To Remember",
  "Green Day",
  "Alabama Shakes",
  "Taylor Swift",
  "Beyonce",
  "Lady Gaga"
];
function renderButtons() {
  // Deleting the gifs prior to adding new gifs
  $("#buttons-view").empty();
  // Looping through the array of bands/ artists
  for (var i = 0; i < bands.length; i++) {
    // Then dynamicaly generating buttons for each band/ artist in the array
    var a = $("<button>");
    // Adding a class of band/ artist to our button
    a.addClass("band");
    // Adding a data-attribute
    a.attr("data-name", bands[i]);
    // Providing the initial button text
    a.text(bands[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

//get input from user. Store input in a variable. create and on click function for the submit buttong to render new items into our array which need to be buttons.
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  userInput = $("#gif-input")
    .val()
    .trim();
  console.log(userInput);
  bands.push(userInput);
  console.log(bands);
  renderButtons();
});
$(document).on("click", ".band", function() {
  var x = $(this).data("name");
  console.log(x);

  // Constructing a queryURL using the band name
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    x +
    "&api_key=XljahkQmrRVSeTQEE2J8thxiOuNW1tn1";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .done(function(response) {
      console.log(queryURL);
      console.log(response);

      // Looping through each result item
      for (var i = 0; i < response.data.length; i++) {
        // Creating and storing a div tag
        var bandDiv = $("<div>");
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + response.data[i].rating);

        // Creating and storing an image tag
        var bandImage = $("<img>");
        bandImage.attr(
          "src",
          response.data[i].images.fixed_height_still.url.replace(
            /^http:\/\//i,
            "https://"
          )
        );
        bandImage.attr(
          "data-still",
          response.data[i].images.fixed_height_still.url.replace(
            /^http:\/\//i,
            "https://"
          )
        );
        bandImage.attr(
          "data-animate",
          response.data[i].images.fixed_height.url.replace(
            /^http:\/\//i,
            "https://"
          )
        );
        bandImage.attr("data-state", "still");
        bandImage.addClass("gif");
        bandDiv.append(p);
        bandDiv.append(bandImage);

        // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(bandDiv);

        //here is our on click function to start and stop the gifs once loaded onto the page
      } //end of the for loop
      $(document).on("click", "img", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
});
renderButtons();
