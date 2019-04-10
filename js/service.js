
const apiKey = "4ad1114b14d40f4b5181415c0fee5e25";
let searchButton = document.getElementById("search-btn");
let requiredLocation = document.getElementById("search-location");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");

searchButton.addEventListener("click", findWeatherDetails);
requiredLocation.addEventListener("keyup", enterPressed);

function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (requiredLocation.value === "") {
        // Display a message if user does'nt enter location and presses the "Get Weather" button
        alert("Enter location")
    } else {
        let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + requiredLocation.value + "&appid="+apiKey;
        httpAsyncRequest(apiURL, responseFromAPICall);
    }
}

function responseFromAPICall(response) {
    let jsonResponseObject = JSON.parse(response);
    cityName.innerHTML = jsonResponseObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonResponseObject.weather[0].icon + ".png";
    var tempFromResponse = parseInt(jsonResponseObject.main.temp - 273)
    var celsiusToFahrenheit = (tempFromResponse * (9/5)) + 32;
    var formattedValueOfTemp = Math.round(celsiusToFahrenheit);
    temperature.innerHTML = formattedValueOfTemp + "°F";
    humidity.innerHTML = jsonResponseObject.main.humidity + "%";
}

function httpAsyncRequest(url, callback) {
    console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200) // request is finished and response is ready
        callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); 
    httpRequest.send();
}