import axios  from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeatherLocation({lat, lon}) {
    if(!lat || !lon) throw new Error("Latitude e longitude são necessárias")

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`;

    const response = await axios.get(url)
    return response.data
}

export async function getForeCastLocation({lat, lon}) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`;
    const response = await axios.get(url)
    return response.data
}

export async function getTodayForecast({ lat, lon }) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt`;
    const response = await axios.get(url);

    const allForecasts = response.data.list;

    const today = new Date().toISOString().split('T')[0];

    const desiredHours = ['12:00:00', '15:00:00', '18:00:00', '21:00:00', '00:00:00']

    const filteredForecasts = allForecasts.filter(item => {
        const [date, time] = item.dt_txt.split(' ')
        return date === today && desiredHours.includes(time)
    })

    return filteredForecasts
}

export async function getTodayForecastByCity(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt`;
  const response = await axios.get(url);

  const allForecasts = response.data.list;

  const today = new Date().toISOString().split('T')[0];

  const desiredHours = ['12:00:00', '15:00:00', '18:00:00', '21:00:00', '00:00:00'];

  const filteredForecasts = allForecasts.filter((item) => {
    const [date, time] = item.dt_txt.split(' ');
    return date === today && desiredHours.includes(time);
  });

  return filteredForecasts;
}

export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt`;
  const response = await axios.get(url);
  return response.data;
}