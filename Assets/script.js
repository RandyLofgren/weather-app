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
    var myDate = new Date();
    //  var myDateString = myDate.toLocaleString()
     
     
    $("#cloudIcon").attr("src", icon);
    $(".cityapi").text(response.name + "  ");
    $(".windapi").text("Wind: " + response.wind.speed + "MPH");
    $(".humidityapi").text("Humidity: " + response.main.humidity + "%");
    $(".tempapi").text("Temp: " + response.main.temp + " \u00B0F");

    $("#cityID").append(myDate.toLocaleString());

    var lon = (response.coord.lon)
    var lat = (response.coord.lat)

    var UVqueryCall = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    $.ajax({
      url: UVqueryCall,
      method: "GET"
    }).then(function (UVResponse) {
      $(".uv-indexapi").text("UV Index: " + UVResponse.value);
      if (UVResponse.value < 2.01) {
        $(".uv-indexapi").addClass("greenBack rounded");
      } else if (UVResponse.value < 5.01) {
        $(".uv-indexapi").addClass("yellowBack rounded");
      } else if (UVResponse.value < 7.01) {
        $(".uv-indexapi").addClass("orangeBack rounded");
      } else if(UVResponse.value > 7.00) $(".uv-indexapi").addClass("redBack rounded");
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
  $("#fiveDayCast").empty();

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
    var currentDate = new Date().getDate();
    var currentMonth =new Date().getMonth();
    var currentYear = new Date().getFullYear()
    // var currentTime = currentDate + currentMonth;
    

    for (var i = 7; i < 40; i = i + 8) {
      
      fiveDayDiv = $("<div>");
      p = $("<p>");
      p.text(((currentMonth+1) +'/' + ((currentDate+i/8)+.125) + '/' + currentYear));
      fiveDayDiv.addClass("col");
      fiveDayDiv.addClass("five-day");
      fiveDayDiv.addClass("rounded");
      fiveDayDiv.append(p);
      $("#fiveDayCast").append(fiveDayDiv);
      cloudImage = $("<img>")
      cloudImage.attr("src", results[i].weather.icon);  //need help here
      fiveDayDiv.append(cloudImage)
      ptemp= $("<h6>")
      ptemp.text("Temp: " + results[i].main.temp + "\u00B0F");
      fiveDayDiv.append(ptemp);
      phum= $("<h5>");
      phum.text("Humidity: " + results[i].main.humidity + "%");
      fiveDayDiv.append(phum);



    }


    



  });

}





$(document).on("click", ".city", displayCityInfo);
$(document).on("click", ".city", fiveCityInfo);



renderButtons();
