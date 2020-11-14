// Initial array of cities
var cities = [];



function displayCityInfo() {

  var city = $(this).attr("data-name");
  var APIKey = "3047b4fdf5e4cef615044702d2f6aa10";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;


  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var iconGrab = (response.weather[0].icon);
    var icon = "http://openweathermap.org/img/wn/" + iconGrab + "@2x.png";
    var myDate = new Date(1605311332 * 1000);

    $("#cloudIcon").attr("src", icon);
    $(".cityapi").text(response.name + "  ");
    $(".windapi").text("Wind: " + response.wind.speed + "MPH");
    $(".humidityapi").text("Humidity: " + response.main.humidity + "%");
    $(".tempapi").text("Temp: " + response.main.temp + " \u00B0F");

    $("#cityID").append(myDate.toGMTString() + "<br>" + myDate.toLocaleString());

    var lon = (response.coord.lon)
    var lat = (response.coord.lat)

    var UVqueryCall = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    $.ajax({
      url: UVqueryCall,
      method: "GET"
    }).then(function (UVResponse) {
      $(".uv-indexapi").text("UV Index: " + UVResponse.value);
      if (UVResponse.value < 2.01) {
        $(".uv-indexapi").addClass(greenBack);
      } else if (UVResponse.value < 5.01) {
        $(".uv-indexapi").addClass(yellowBack);
      } else if (UVResponse.value < 7.01) {
        $(".uv-indexapi").addClass(orangeBack);
      } $(".uv-indexapi").addClass(redBack);
    })




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
    localStorage.setItem("addedCity", JSON.stringify(cities));
    $("#add-city").val("");

  }
  renderButtons();
});

function fiveCityInfo() {

  var city = $(this).attr("data-name");
  var APIKey = "3047b4fdf5e4cef615044702d2f6aa10";
  var fiveURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;


  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: fiveURL,
    method: "GET"
  }).then(function (fiveresponse) {
    console.log(fiveresponse)
    results = fiveresponse.list

    for (var i = 0; i < 39; i = i + 8) {
      fiveDayDiv = $("<div>");
      p = $("<p>");
      p.text(results[i].dt);
      fiveDayDiv.addClass("col");
      fiveDayDiv.addClass("five-day")
      fiveDayDiv.addClass("rounded")
      fiveDayDiv.append(p);
      $("#fiveDayCast").append(fiveDayDiv);
      cloudImage = $("<img>")
      cloudImage.attr("src", results[i].weather.icon)
      fiveDayDiv.append(cloudImage)
      // ptemp= $("<p>")
      // ptemp.text("Temp: " + results[i].main.temp + "\u00B0F")
      // $(".five-day").append(ptemp)



    }


    // // Make an image tag with jQuery and store it in a variable named animalImage.
    // animalImage = $("<img>")
    // // Set the image's src to results[i]'s fixed_height.url.
    // animalImage.attr("src", results[i].images.fixed_height.url);
    // animalDiv.append(animalImage)



  });

}





$(document).on("click", ".city", displayCityInfo);
$(document).on("click", ".city", fiveCityInfo);



renderButtons();

