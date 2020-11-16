// Initial array of cities
var cities = [];



function displayCityInfo(city) {

  // var city = $(this).attr("data-name");
  var APIKey = "3047b4fdf5e4cef615044702d2f6aa10";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

  fiveCityInfo(city)
  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var iconGrab = (response.weather[0].icon);
    var icon = "http://openweathermap.org/img/wn/" + iconGrab + "@2x.png";
    var myDate = new Date();
    //  var myDateString = myDate.toLocaleString()


    var iconImage =$("<img>").attr("src", icon);
    $(".cityapi").text(response.name + "  ");
    $(".windapi").text("Wind: " + response.wind.speed + "MPH");
    $(".humidityapi").text("Humidity: " + response.main.humidity + "%");
    $(".tempapi").text("Temp: " + response.main.temp + " \u00B0F");

    $("#cityID").append(myDate.toLocaleString(), iconImage);

    var lon = (response.coord.lon)
    var lat = (response.coord.lat)

    var UVqueryCall = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    $.ajax({
      url: UVqueryCall,
      method: "GET"
    }).then(function (UVResponse) {
      var index = $("<span>").text( UVResponse.value);
      if (UVResponse.value < 2.01) {
        $(index).addClass("greenBack rounded");
      } else if (UVResponse.value < 5.01) {
        $(index).addClass("yellowBack rounded");
      } else if (UVResponse.value < 7.01) {
        $(index).addClass("orangeBack rounded");
      } else if (UVResponse.value > 7.00) $(index).addClass("redBack rounded");
      $(".uv-indexapi").text("UV Index: ")
      $(".uv-indexapi").append(index)
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
    $("#buttons-view").prepend(a);
  }
  displayCityInfo(savedCities[savedCities.length-1])
}

$("#sub-city").on("click", function (event) {
  event.preventDefault();
  var cityAdder = $("#add-city").val().trim();
  if(cityAdder === "") return
  if (cities.indexOf(cityAdder) === -1) {
    cities.push(cityAdder);
    localStorage.setItem("addedCity", JSON.stringify(cities));
    $("#add-city").val("");

  }
  renderButtons();
});

function fiveCityInfo(city) {
  $("#fiveDayCast").empty();

  // var city = $(this).attr("data-name");
  var APIKey = "3047b4fdf5e4cef615044702d2f6aa10";
  var fiveURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;


  // Creates AJAX call for the specific city button being clicked
  $.ajax({
    url: fiveURL,
    method: "GET"
  }).then(function (fiveresponse) {
    console.log(fiveresponse)
    results = fiveresponse.list
    // var currentDate = new Date().getDate();
    // var currentMonth = new Date().getMonth();
    // var currentYear = new Date().getFullYear()
    // var currentTime = currentDate + currentMonth;


    for (var i = 0; i < results.length; i++) {
      if (fiveresponse.list[i].dt_txt.split(" ")[1] === "15:00:00") {
        var currentDay = results[i]
        console.log(currentDay)
        fiveDayDiv = $("<div>");
        p = $("<p>");
        p.text(moment.unix(currentDay.dt).format("L"));
        fiveDayDiv.addClass("col");
        fiveDayDiv.addClass("five-day");
        fiveDayDiv.addClass("rounded");
        fiveDayDiv.append(p);
        $("#fiveDayCast").append(fiveDayDiv);
        cloudImage = $("<img>")
        cloudImage.attr("src", "http://openweathermap.org/img/wn/"+currentDay.weather[0].icon+".png");  //need help here
        fiveDayDiv.append(cloudImage)
        ptemp = $("<h6>")
        ptemp.text("Temp: " + results[i].main.temp + "\u00B0F");
        fiveDayDiv.append(ptemp);
        phum = $("<h5>");
        phum.text("Humidity: " + results[i].main.humidity + "%");
        fiveDayDiv.append(phum);
      }


    }






  });

}





$(document).on("click", ".city", function () {
  var city = $(this).attr("data-name")
  displayCityInfo(city)
});
// $(document).on("click", ".city", fiveCityInfo);



renderButtons();
