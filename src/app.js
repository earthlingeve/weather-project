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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  return days[day];
}

function showForecast(response) {
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <div class="weather-forecast-date">
              <strong>${formatDay(forecastDay.dt)}</strong>
            </div>
            <div class="future-emoji">
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />
            </div>
            <div class="future-forecast-temperature">
              <span class="future-forecast-temperature-max"> H:${Math.round(
                forecastDay.temp.max
              )}°F </span
              >|<span class="future-forecast-temperature-min">L:${Math.round(
                forecastDay.temp.min
              )}°F</span>
            </div>
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function isSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let cityName = `${input.value}`;
  let apiKey = "9251248a80cd4432d5256905f9a0ea2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9251248a80cd4432d5256905f9a0ea2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
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
  fahrenheitTemp = response.data.main.temp;

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

  getForecast(response.data.coord);
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
  fahrenheitTemp = response.data.main.temp;
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

let fahrenheitTemp = null;

function changeMeasurementF(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = Math.round(fahrenheitTemp);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}

function changeMeasurementC(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  mainTemp.innerHTML = Math.round(celsiusTemp);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");

celsius.addEventListener("click", changeMeasurementC);
fahrenheit.addEventListener("click", changeMeasurementF);

currentPosition();
