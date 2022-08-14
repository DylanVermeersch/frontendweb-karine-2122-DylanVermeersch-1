const API_KEY = 'e7a90afe281296f42d13ad88d019073d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});

    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {

}

const getFormattedWeatherData = (searchParams) => {
    const formatedCurrentWeather = getWeatherData
    ('weather', searchParams).then(formatCurrentWeather);
};