$( document ).ready(function() {


  $.ajax({
      url: `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDyDr_awoC_FgjmSCrYjCfyyoGVwANROuQ`,
     
     type:"POST",
     dataType: "JSON",
     
     
      success: function(response) {
          console.log('my location data ', response);
          getWeather(response.location)
      }
    }
  );
  
  
  var getLocation = function(location) {
  $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAAS5eZn-IKVDIypKOcw27MdPFN6QYfEEk`,
      success: function(response) {
          console.log('my location data ', response);
          getWeather(response.results[0].geometry.location)
      }
  });
};

    var getWeather = function(coordinates) {    
    
    $.ajax({
    url: `https://api.darksky.net/forecast/879891e78b2a14cd41bef7702f3a25f3/${coordinates.lat},${coordinates.lng}`,
 
    jsonp: "callback",

    dataType: "jsonp",

    success: function( response ) {
          console.log('my weather data ', response);
          tempO(response.currently.temperature)
          precip(response.currently.precipProbability)
          humid(response.currently.humidity)
          wind(response.currently.windSpeed)
          summary(response.currently.summary)
          tempH(response.daily.data["0"].apparentTemperatureMax)
          tempL(response.daily.data["0"].apparentTemperatureMin)
          time(response.currently.time)
        
        appendDays(response.daily.data)
        
    }
});
};



var tempO = function(temperature) {
    console.log('current temp data', temperature);
    $(".temp-0 p").replaceWith("<p></p>").addClass("temp-0");
    $(".temp-0 p").append(Math.round(temperature) + "&#176;" + " F");
}

var precip = function(precipitation) {
  console.log('current precip probability', precipitation);
   $(".precip-0 p").replaceWith("<p></p>").addClass("precip-0");
    $(".precip-0 p").append("Precipitation: </br>" + (precipitation*100) + "%");
}

var humid = function(humidity) {
  console.log('current humidity', humidity);
   $(".humid-0 p").replaceWith("<p></p>").addClass("humid-0");
    $(".humid-0 p").append("Humidity: </br>" + Math.round(humidity*100) + "%");
}

var wind = function(windSpeed) {
  console.log('current wind speed', windSpeed);
   $(".wind-0 p").replaceWith("<p></p>").addClass("wind-0");
    $(".wind-0 p").append("Wind Speed: </br>" + windSpeed + " mph");
}

var summary = function(summary) {
  console.log('current summary', summary);
   $(".sum-0 p").replaceWith("<p></p>").addClass("sum-0");
    $(".sum-0 p").append("Summary: " + summary);
}

var tempH = function(tempHigh) {
  console.log('today temp High', tempHigh);
   $(".tempH-0 p").replaceWith("<p></p>").addClass("tempH-0");
    $(".tempH-0 p").append("High: " + Math.round(tempHigh) + "&#176;" + " F");
}

var tempL = function(tempLow) {
  console.log('today temp Low', tempLow);
   $(".tempL-0 p").replaceWith("<p></p>").addClass("tempL-0");
    $(".tempL-0 p").append("Low: " + Math.round(tempLow) + "&#176;" + " F");
}

var time = function(currentTime) {
    console.log ('current time', currentTime);
    $(".header-time p").replaceWith("<p></p>").addClass("header-time");
    $(".header-time p").append(Date(currentTime));
}

var tempHi = function(tempHigh) {
  console.log('today temp High', tempHigh);
   $(".tempH-0 p").replaceWith("<p></p>").addClass("tempH-0");
    $(".tempH-0 p").append("High: " + Math.round(tempHigh) + "&#176;" + " F");
}

    $("#search").keypress(function(event) {
        if (event.which==13) {
        getLocation($(this).val())
        }
    })
    
  
  function appendDays(days) {
  
  $(".week").empty()
  
  days.forEach(function(newDay) {
    
    var dayElement = `
          <div class="week-day">
            <div class="day">
                <p>Day</p>
            </div>
            <div class="temp-high">
                <p>High: ${Math.round(newDay.temperatureMax) + "&#176;" + " F"} </p>
            </div>
            <div class="temp-low">
                <p>Low: ${Math.round(newDay.temperatureMin) + "&#176;" + " F"} </p>
            </div>
            <div class="precip">
                <p>Precipitation: ${Math.round(newDay.precipProbability*100) + "%"}</p>
            </div>
            <div class="humid">
                <p>Humidity: ${Math.round(newDay.humidity*100) + "%"} </p>
            </div>
            <div class="wind">
                <p>Wind Speed: ${newDay.windSpeed} mph</p>
            </div>
            <div class="summary">
                <p>Summary: ${newDay.summary} </p>
            </div>
        </div>
    `

$(".week").append(dayElement);

  })
  
  }
  
  
}); 


//}