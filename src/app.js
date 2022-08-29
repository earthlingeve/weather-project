function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function isSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let cityName = `${input.value}`;
  let apiKey = "9251248a80cd4432d5256905f9a0ea2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let descriptionElement = document.querySelector("#description-element");
  let time = document.querySelector("#time");
  let humidityElement = document.querySelector("#humidity-element");
  let windElement = document.querySelector("#wind-element");
  let currentTemp = document.querySelector("#main-temp");
  let h2 = document.querySelector("#current-city");
  let iconElement = document.querySelector("#icon");

  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;

  descriptionElement.innerHTML = `${description}`;
  windElement.innerHTML = `${wind}`;
  time.innerHTML = formatDate(response.data.dt * 1000);
  currentTemp.innerHTML = `${temperature}`;
  humidityElement.innerHTML = `${humidity}`;
  h2.innerHTML = response.data.name;
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function giveCurrentLocation(response) {
  console.log(response);
  let h2 = document.querySelector("#current-city");
  h2.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#main-temp");
  currentTemp.innerHTML = `${temperature}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-element");
  windElement.innerHTML = `${wind}`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity-element");
  humidityElement.innerHTML = `${humidity}`;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description-element");
  descriptionElement.innerHTML = `${description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let time = document.querySelector("#time");
  time.innerHTML = formatDate(response.data.dt * 1000);
}
function showCurrentLocation(position) {
  let latt = position.coords.latitude;
  let lonn = position.coords.longitude;
  //console.log(position);
  let apiKey = "9251248a80cd4432d5256905f9a0ea2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${lonn}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(giveCurrentLocation);
}
function currentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", isSearch);

let locButton = document.querySelector("#location-button");
locButton.addEventListener("click", currentPosition);

function changeMeasurementC(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  let celsiusTemp = "testing";
  mainTemp.innerHTML = celsiusTemp;
}
function changeMeasurementF(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  let farenheitTemp = (14 * 9) / 5 + 32;
  mainTemp.innerHTML = farenheitTemp;
}

let farenheit = document.querySelector("#farenheit");
let celsius = document.querySelector("#celsius");

celsius.addEventListener("click", changeMeasurementC);
farenheit.addEventListener("click", changeMeasurementF);

currentPosition();
