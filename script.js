const citySelect = document.getElementById('city');

const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "f1d04f509496c2df2f5db373cca7d80e"
}


getWeather();

async function getWeather() {
    const cityId = citySelect.value;
    const apiUrl = `${param.url}weather?id=${cityId}&units=metric&appid=${param.appid}`;


    const resp = await fetch(apiUrl);
    const data = await resp.json();

    showWeather(data);
}

function showWeather(weather) {
    const {
        weather: [iconDesc],
        main: { feels_like, humidity, pressure, temp, temp_max, temp_min },
        wind: { speed }
    } = weather;

    const iconUrl = `http://openweathermap.org/img/w/${iconDesc.icon}.png`;
    document.querySelector('.weather-app__temp-icon').style.backgroundImage = `url(${iconUrl})`;

    document.getElementById('curr-temp').innerHTML = `${Math.round(temp)}°`;

    document.querySelector('.weather-app__temp-name').textContent = `${iconDesc.description}`;

    document.getElementById('feels-like').innerHTML = `${Math.round(feels_like)}°C`;
    document.getElementById('wind').innerHTML = `${Math.round(speed)} km/h`;
    document.getElementById('humidity').innerHTML = `${humidity}%`;
    document.getElementById('pressure').innerHTML = `${Math.round(pressure)} mb`;
    document.getElementById('temp-min').innerHTML = `${Math.round(temp_min)}°C`;
    document.getElementById('temp-max').innerHTML = `${Math.round(temp_max)}°C`;

    console.log(weather);
}

citySelect.addEventListener('change', (event) => {
    getWeather();
});