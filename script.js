let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = document.querySelector("#day");
day.innerHTML = `${days[now.getDay()]} ${hours}:${minutes}`;
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let today = document.querySelector("#date");
today.innerHTML = `${date} ${month} ${year}`;

function showTemperature(response) {
  let minimum = document.querySelector("#min");
  minimum.innerHTML = Math.round(response.data.main.temp_min);
  let maximum = document.querySelector("#max");
  maximum.innerHTML = Math.round(response.data.main.temp_max);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = description.toUpperCase();
  let humidity = response.data.main.humidity;
  let getHumidity = document.querySelector("#humidity");
  getHumidity.innerHTML = humidity;
  let wind = response.data.wind.speed;
  let windDirect = document.querySelector("#wind");
  windDirect.innerHTML = Math.round(wind);
}

function searchCity(city) {
  let apiKey = "97c2f6a3b34509ac62090edc5d18d949";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let town = document.querySelector("#city-input").value;
  searchCity(town);
}

function showPosition(position) {
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.currentPosition(showPosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", currentPosition);

searchCity("Johannesburg");
