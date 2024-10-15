const apiKey = "cd0bd50926a44a9e8c240727241510"; // Your WeatherAPI key
const city = "Jakarta";

// URL for WeatherAPI
const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

// Function to fetch data from WeatherAPI
async function fetchWeatherData() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayCurrentWeather(data.current);
    displayWeatherForecast(data.forecast.forecastday);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("current-weather").innerHTML =
      "<p class='error'>Terjadi kesalahan saat mengambil data cuaca.</p>";
    document.getElementById("weather-forecast").innerHTML =
      "<p class='error'>Ramalan cuaca tidak dapat ditampilkan.</p>";
  }
}

// Function to display current weather
function displayCurrentWeather(currentWeather) {
  const currentWeatherDiv = document.getElementById("current-weather");
  currentWeatherDiv.innerHTML = `
    <h2>Cuaca Hari Ini</h2>
    <p>Suhu: ${currentWeather.temp_c}°C</p>
    <p>Deskripsi: ${currentWeather.condition.text}</p>
    <p>Kecepatan Angin: ${currentWeather.wind_kph} km/h</p>
    <p>Kelembapan: ${currentWeather.humidity}%</p>
    <img src="https:${currentWeather.condition.icon}" alt="Weather icon" />
  `;
}

// Function to display 7-day weather forecast
function displayWeatherForecast(forecastDays) {
  const forecastDiv = document.getElementById("weather-forecast");
  let forecastHTML = "";
  forecastDays.forEach((day) => {
    const date = new Date(day.date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("id-ID", options);

    forecastHTML += `
      <div class="day">
        <h4>${formattedDate}</h4>
        <p>Suhu Siang: ${day.day.maxtemp_c}°C</p>
        <p>Suhu Malam: ${day.day.mintemp_c}°C</p>
        <p>Cuaca: ${day.day.condition.text}</p>
        <img src="https:${day.day.condition.icon}" alt="Weather icon" />
      </div>
    `;
  });
  forecastDiv.innerHTML = forecastHTML;
}

// Call the function to fetch and display weather data
fetchWeatherData();
