console.log("Welcome to the weather");
console.log("<-------++++++------->");
// API key obtained from openweathermap.org
const APIkey = "76cc07c4bbc6bedc0eceb1791bd17796";

let inputEl = document.querySelector("#city-input");
let searchBtn = document.querySelector("#search-button");
let histEL = document.querySelector("#search-history");
let clearHist = document.querySelector("#clear-history");
let currentCity = document.querySelector("#city-name");
let cityTemp = document.querySelector("#temp");
let cityWind = document.querySelector("#wind-speed");
let cityHumid = document.querySelector("#humidity");
let cityUv = document.querySelector("#uvIndex");

let searchHist = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHist);

// Function to fetch data from api and display it to the HTML page.
function searchWeather(cityName) {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const currentDate = new Date(data.dt*1000);
            console.log(currentDate);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();

            currentCity.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ") ";
            cityTemp.innerHTML = "Temperature: " + convertTemp(data.main.temp) + " &#176F";
            cityWind.innerHTML = "Wind Speed: " + data.wind.speed + " mph";
            cityHumid.innerHTML = "Humidity: " + data.main.humidity + "%";

            let lat = data.coord.lat;
            let lon = data.coord.lon;
            let uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&cnt=1";

            fetch(uvQueryUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function (data) {
                cityUv.innerHTML = "UV Index: " + data[0].value;
            })

            let cityID = data.id;
            let forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIkey;
            fetch(forecastQueryUrl)
                .then(function(response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    let forecastCards = document.querySelectorAll(".forecast");
                    for (let index = 0; index < forecastCards.length; index++) {
                        forecastCards[index].innerHTML = "";
                        const forecastIndex = index * 8 + 4;
                        const forecastDate = new Date(data.list[forecastIndex].dt * 1000);
                        const forecastDay = forecastDate.getDate();
                        const forecastMonth = forecastDate.getMonth() + 1; 
                        const forecastYear = forecastDate.getFullYear();
                        const forecastCardDate = document.createElement("p");
                        forecastCardDate.setAttribute("class", "mt-5 mb-0 forecast-date");
                        forecastCardDate.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        forecastCards[index].append(forecastCardDate);
                        const forecastCardTemp = document.createElement("p");
                        forecastCardTemp.innerHTML = "Temp: " + convertTemp(data.list[forecastIndex].main.temp) + "&#176F";
                        forecastCards[index].append(forecastCardTemp);
                        const forecastCardWind = document.createElement("p");
                        forecastCardWind.innerHTML = "Wind Speed: " + data.list[forecastIndex].wind.speed + " mph";
                        const forecastCardHumid = document.createElement("p");
                        forecastCardHumid.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%";
                        forecastCards[index].append(forecastCardHumid);
                        
                    }
                })

        })
};

searchBtn.addEventListener("click", function() {
    let searchedCity = inputEl.value;
    searchWeather(searchedCity);
    searchHist.push(searchedCity);
    localStorage.setItem("search",JSON.stringify(searchHist));
    showSearchHist();
});

clearHist.addEventListener("click", function() {
    searchHist = [];
    showSearchHist();
});

function convertTemp(x) {
    return Math.floor((x - 273.15) * 1.8 + 32);
};

function showSearchHist() {
    histEL.innerHTML = "";
    for (let index = 0; index < searchHist.length; index++) {
        const histItem = document.createElement("input");
        histItem.setAttribute("type", "text");
        histItem.setAttribute("readonly", true);
        histItem.setAttribute("class", "form-control d-block bg-white");
        histItem.setAttribute("value", searchHist[index]);
        histItem.addEventListener("click", function() {
            searchWeather(histItem.value);
        })
        histEL.append(histItem);
    }
}

showSearchHist();
if (searchHist.length > 0) {
    searchWeather(searchHist[searchHist.length - 1]);
}