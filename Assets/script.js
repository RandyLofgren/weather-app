// Initial array of cities
var cities = [];


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayCityInfo() {

  var city = $(this).attr("data-name");
  var APIKey = "3047b4fdf5e4cef615044702d2f6aa10";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + city + "&units=imperial&appid=" + APIKey;


  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    $(".cityapi").text("City: " + response.name);
    $(".windapi").text("wind: " + response.wind.speed + "mph");
    $(".humidityapi").text("Humidity: " + response.main.humidity + "%");
    $(".tempapi").text("Temp: " + response.main.temp + " degrees");
    console.log(response);
    // $(".lonapi").text("Longitude: " + response.coord.lon)
    // $(".latapi").text("Latitude: " + response.coord.lat)
    var lon = (response.coord.lon)
    var lat = (response.coord.lat)

     var UVqueryCall =  "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon +"&appid="+ APIKey;

     $.ajax({
      url: UVqueryCall,
      method: "GET"
    }).then(function (UVResponse) {
      $(".uv-indexapi").text("UV Index: " + UVResponse.value);

      console.log(UVResponse)
    })

    

    // YOUR CODE GOES HERE!!!


    // YOUR CODE GOES HERE!!!

  });
  
}


function renderButtons() {


  $("#buttons-view").empty();
  var savedCities = JSON.parse(localStorage.getItem("addedCity"))
  if (savedCities !== null) {
    cities = savedCities

  }


  for (var i = 0; i < cities.length; i++) {


    var a = $("<button>");
    a.addClass("city");
    a.attr("data-name", cities[i]);
    a.text(cities[i]);
    $("#buttons-view").append(a);
  }
}


$("#sub-city").on("click", function (event) {
  event.preventDefault();

  var cityAdder = $("#add-city").val().trim();
  if (cities.indexOf(cityAdder) === -1) {
    cities.push(cityAdder);
    localStorage.setItem("addedCity", JSON.stringify(cities))
    $("#add-city").val("")
  }






  renderButtons();


});


$(document).on("click", ".city", displayCityInfo);

renderButtons();