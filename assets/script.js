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
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    fetch(queryURL)
        .then(function(response){
            console.log(response);

            const currentDate = new Date(response.data.dt*1000);

            console.log(currentDate);

            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            currentCity.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            
        })
};