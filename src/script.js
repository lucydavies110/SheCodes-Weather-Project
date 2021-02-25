let dateTime = document.querySelector("#dateTime");

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentTime = new Date();
  let currentDay = days[currentTime.getDay()];
  let currentHour = currentTime.getUTCHours();
  if (currentHour < 10) {
    currentHour = `0${currentTime.getUTCHours()}`;
  }
  let currentMinutes = currentTime.getUTCMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentTime.getUTCMinutes()}`;
  }
  let currentDateTime = `${currentDay}  ${currentHour}:${currentMinutes}`;
  dateTime.innerHTML = currentDateTime;
}
formatDate();

function displayCityWeatherData(response) {
  let displayedLocation = document.querySelector("#location");
  let currentLocation = response.data.name;
  displayedLocation.innerHTML = currentLocation;
  let displayedTemperature = document.querySelector("#temperature");
  let currentTemperature = Math.round(response.data.main.temp);
  displayedTemperature.innerHTML = currentTemperature;
  let displayedDescription = document.querySelector("#description");
  let currentDescription = response.data.weather[0].main;
  displayedDescription.innerHTML = currentDescription;
  let displayedHumidity = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  displayedHumidity.innerHTML = `Humidity: ${currentHumidity}%`;
  let displayedWindSpeed = document.querySelector("#windSpeed");
  let currentWindSpeed = Math.round(response.data.wind.speed);
  displayedWindSpeed.innerHTML = `Wind: ${currentWindSpeed} m/s`;
}

function changeCity(city) {
  let apiKey = "d77cc48aa8f068171efea96146b6125b";
  let units = "metric";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(weatherApiUrl).then(displayCityWeatherData);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  changeCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

changeCity("London");

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d77cc48aa8f068171efea96146b6125b";
  let units = "metric";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(weatherApiUrl).then(displayLocationWeatherData);
  function displayLocationWeatherData(response) {
    let displayedLocation = document.querySelector("#location");
    let currentLocation = response.data.name;
    displayedLocation.innerHTML = currentLocation;
    let displayedTemperature = document.querySelector("#temperature");
    let currentTemperature = Math.round(response.data.main.temp);
    displayedTemperature.innerHTML = currentTemperature;
    let displayedDescription = document.querySelector("#description");
    let currentDescription = response.data.weather[0].main;
    displayedDescription.innerHTML = currentDescription;
    let displayedHumidity = document.querySelector("#humidity");
    let currentHumidity = response.data.main.humidity;
    displayedHumidity.innerHTML = `Humidity: ${currentHumidity}%`;
    let displayedWindSpeed = document.querySelector("#windSpeed");
    let currentWindSpeed = Math.round(response.data.wind.speed);
    displayedWindSpeed.innerHTML = `Wind: ${currentWindSpeed} m/s`;
  }
}
function locationWeatherData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", locationWeatherData);

function giveCelciusTemperature(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector("#temperature");
  displayedTemperature.innerHTML = "19";
}

function giveFahrenheitTemperature(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector("#temperature");
  displayedTemperature.innerHTML = "66";
}

let celciusSelector = document.querySelector("#celcius-link");
let fahrenheitSelector = document.querySelector("#fahrenheit-link");

celciusSelector.addEventListener("click", giveCelciusTemperature);
fahrenheitSelector.addEventListener("click", giveFahrenheitTemperature);
