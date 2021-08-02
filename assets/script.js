console.log("Welcome to the weather");
console.log("<-------++++++------->");

const APIkey = "76cc07c4bbc6bedc0eceb1791bd17796";
let inputEl = document.querySelector("#city-input");
let searchBtn = document.querySelector("#button-addon2");
let histEL = document.querySelector("#search-history");
let clearHist = document.querySelector("#clear-history");
let currentCity = document.querySelector("#city-name");
let cityTemp = document.querySelector("#temp");
let cityWind = document.querySelector("#wind-speed");
let cityHumid = document.querySelector("#humidity");
let cityUv = document.querySelector("#uvIndex");

function searchWeather(cityName) {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    fetch(queryUrl)
        .then(function(response){
            console.log(response);

            const currentDate = new Date(response.data.dt*1000);

            console.log(currentDate);

            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            currentCity.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            cityTemp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            cityWind.innerHTML = "Wind Speed: " + response.data.wind.speed + " mph";
            cityHumid.innerHTML = "Humidity: " + response.data.main.humidity + "%";

            let lat = response.data.coord.lat;
            let lon = response.data.coord.lon;
            let uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&cnt=1";
            fetch(uvQueryUrl)
            .then(function(response){
                cityUv.innerHTML = "UV Index: " + response.data[0].value;
            });

            let cityID = response.data.id;
            let forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIkey;
            
        })
};