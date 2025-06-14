import { getTodayForecast } from "../../../api/weatherLocation"
import { useState, useEffect } from "react";

function CardHourlyForecast() {
    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [forecastData, setForecastData] = useState(null)

    useEffect(() => {
        if(!navigator.geolocation) {
            setError("Geolocalização não suportada pelo navegador.")
            setLoading(false)
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                })
            },
            (err) => {
                setError("Permissão negada ou erro ao obter localização")
                setLoading(false)
            }
        )
    }, [])

    useEffect(() => {
        if(location) {
        getTodayForecast({lat: location.lat, lon: location.lon})
            .then(setForecastData)
            .catch(console.error)
        }
    }, [location])

    return (
        <div className="card flex-none w-[65%] bg-[#444444] text-white rounded-2xl flex flex-col items-center justify-evenly gap-10 ">
            <h1 className="text-3xl font-bold capitalize text-center">Proximas previsões</h1>

            <div className=" box-card-previsao flex gap-4">
                {forecastData && forecastData.length > 0 ? forecastData.map((item) => (
                <div key={item.dt_txt} className="card-previsão flex flex-col items-center bg-[#373636] rounded-4xl gap-2">
                    
                    <span className="text-2xl font-bold">{item.dt_txt.split(" ")[1].slice(0, 5)}</span>
                    <span className="font-bold">{new Date(item.dt * 1000).toLocaleDateString('pt-BR', {weekday: 'long'})}, {new Date(item.dt * 1000).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'}).replace('.', '')}</span>
                    <img
                        className='w-[100px]'
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].description}
                    />
                    <span className="font-bold">{parseInt(item.main.temp)}°C</span>
                    <div className="flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10 text-white"
                        style={{ transform: `rotate(${item.wind.deg}deg)` }}
                    >
                        <path
                        fillRule="evenodd"
                        d="M12 2c.414 0 .789.252.934.633l9 23A1 1 0 0121 27H3a1 1 0 01-.934-1.367l9-23A1 1 0 0112 2zm0 3.618L4.618 25h14.764L12 5.618z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </div>
                    <span className="font-bold text-[18px]">{parseInt(item.wind.speed)}km/h</span>
                </div>
                )) : (
                    <span className="capitalize text-2xl">Sem previsões para hoje...</span>
                )
                }
            </div>
        </div>
  )
}

export default CardHourlyForecast