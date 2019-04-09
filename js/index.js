
const apiKey = "4ad1114b14d40f4b5181415c0fee5e25";
let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-location");
let cityName = document.getElementById("location");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (searchInput.value === "") {
        alert("Enter location")
    } else {
        let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+apiKey;
        httpRequestAsync(apiURL, responseFromAPICall);
    }
}

function responseFromAPICall(response) {
    let jsonResponseObject = JSON.parse(response);
    cityName.innerHTML = jsonResponseObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonResponseObject.weather[0].icon + ".png";
    var tempFromResponse = parseInt(jsonResponseObject.main.temp - 273)
    var celsiusToFahrenheit = (tempFromResponse * (9/5)) + 32;
    temperature.innerHTML = celsiusToFahrenheit + "°F";
    humidity.innerHTML = jsonResponseObject.main.humidity + "%";
}

function httpRequestAsync(url, callback) {
    console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
        callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}