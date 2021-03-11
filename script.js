const api = {
    base: 'http://api.openweathermap.org/',
    key: 'c57da449203d8fc145b84d8e1c5fefdc'
}
const searchArea = document.getElementById('search-area');
const searchBtn = document.getElementById('btn-search');
const weatherIcon = document.getElementById('weather-icon');
const cityName = document.getElementById('city');
const temperature = document.getElementById('temperature');
const weather = document.getElementById('weather');

const getWeatherData = async (api) => {
    try {
        const response = await fetch(api);
        const data = await response.json();
        updateWeatherInfo(data)
    } catch (err) {
        console.log(err);
    }
}

const updateWeatherInfo = (data) => {
    weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    temperature.innerText = data.main.temp;
    cityName.innerText = `${data.name}, ${data.sys.country}`;
    weather.innerText = data.weather[0].main;
    searchArea.value = '';
}

searchBtn.addEventListener('click', () => {
    let searchingCity = searchArea.value;
    if (searchingCity) {
        searchingCity = searchingCity.trim();
        if (searchingCity.includes(' ')) {
            searchingCity = searchingCity.replace(' ', '+');
        }
    }
    const weatherAPI = `${api.base}data/2.5/weather?q=${searchingCity}&appid=${api.key}`;
    getWeatherData(weatherAPI);
});