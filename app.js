let key = "1fe1b1156deb9197209e78927d7eff85";
let long;
let lat;


function getWeather(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=1fe1b1156deb9197209e78927d7eff85`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(function(response){
                console.log(response); 
                var weatherDiv = $("<div>").addClass("weatherDiv");
                var topDiv = $("<div>").addClass("topDiv")
                var bottomDiv = $("<div>").addClass("bottomDiv")
                // city name
                var pCity = $("<h1>").text(response.name).addClass('cityName');
                topDiv.append(pCity)
                //weather icon
                var imageURL = response.weather[0].icon;
                 var image = "https://openweathermap.org/img/w/" + imageURL + ".png";
                var imgDiv = $("<div>").addClass('imgDiv')
                var weatherImage = $('<img>').attr('src', image).addClass('image');
                imgDiv.append(weatherImage)
                topDiv.append(imgDiv);
                // current date
                var cityDate = $("<h4>").text(moment().format('L')).addClass("date")
                topDiv.append(cityDate);
                weatherDiv.append(topDiv)

                // temperature
                var temp = Math.round(response.main.temp);
                var pTemp = $("<p>").text("Temperature: " + temp + "\xB0").addClass("details")
                bottomDiv.append(pTemp);
                // humidity
                var hum = response.main.humidity;
                var pHum = $("<p>").text("Humidity " + hum + "%").addClass("details")
                bottomDiv.append(pHum);
                // wind
                var wind = response.wind.speed;
                var pWind = $("<p>").text("Wind Speed: " + wind + " MPH").addClass("details");
                bottomDiv.append(pWind);
                weatherDiv.append(bottomDiv)
    
                $("#contentBox").prepend(weatherDiv);

            
        })

    });




    $("#goButton").on("click", function(){
        let cityName = document.querySelector("#box").value;
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&units=imperial&appid=" + key;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response); 
            var weatherDiv = $("<div>").addClass("weatherDiv");
            var topDiv = $("<div>").addClass("topDiv");
            var bottomDiv = $("<div>").addClass("bottomDiv");
            // city name
            var pCity = $("<h1>").text(response.name).addClass('cityName');
            topDiv.append(pCity)
          //weather icon
            var imageURL = response.weather[0].icon;
            var image = "https://openweathermap.org/img/w/" + imageURL + ".png";
            var imgDiv = $("<div>").addClass('imgDiv')
            var weatherImage = $('<img>').attr('src', image).addClass('image');
            imgDiv.append(weatherImage)
            topDiv.append(imgDiv)
            // current date
            var cityDate = $("<h4>").text(moment().format('L')).addClass("date")
            topDiv.append(cityDate);
            weatherDiv.append(topDiv)
            // temperature
            var temp = Math.round(response.main.temp);
            var pTemp = $("<p>").text("Temperature: " + temp + "\xB0").addClass("details")
            bottomDiv.append(pTemp);
            // humidity
            var hum = response.main.humidity;
            var pHum = $("<p>").text("Humidity " + hum + "%").addClass("details")
            bottomDiv.append(pHum);
            // wind
            var wind = response.wind.speed;
            var pWind = $("<p>").text("Wind Speed: " + wind + " MPH").addClass("details");
            bottomDiv.append(pWind);
            weatherDiv.append(bottomDiv);

            $("#contentBox").prepend(weatherDiv);
        })
    })
}
}
getWeather()