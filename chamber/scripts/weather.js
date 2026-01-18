const lat = 5.5498;
const lon = 5.7675;
const apiKey = '0ec736472d5327fc91763c22e4fefacc';

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
  const response = await fetch(url);
  const data = await response.json();

  const current = data.list[0];
  const iconCode = current.weather[0].icon;

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const icon = document.querySelector('#weather-icon');
  icon.src = iconUrl;
  icon.alt = current.weather[0].description;

  document.querySelector('#weather-current').innerHTML = `
    <p class="temp">${current.main.temp} °C</p>
    <p class="desc">${current.weather[0].description}</p>
  `;

  const forecast = document.querySelector('#weather-forecast');
  forecast.innerHTML = '';

  for (let i = 8; i <= 24; i += 8) {
    const day = data.list[i];
    forecast.innerHTML += `
      <p>
        ${new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })}:
        ${day.main.temp} °C
      </p>
    `;
  }
}

getWeather();
