import { getForeCastLocation } from "../../../api/weatherLocation"
import { useState, useEffect } from "react"
import ForecastCard from "./ForecastCard"

function CardNextDays() {
    // Previsão do clima dos proximos 5 dias
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
        getForeCastLocation({lat: location.lat, lon: location.lon})
            .then(setForecastData)
            .catch(console.error)
        }
    }, [location])
    
    return (
        <div className="card w-[35%] bg-[#444444] text-white rounded-2xl flex flex-col items-center gap-10 ">
            <h1 className="text-2xl font-bold capitalize">Previsão dos proximos 5 dias</h1>
            {forecastData && (
                <>
                    <div className="w-full flex flex-col justify-between">
                        {forecastData.list
                        .filter((item) => item.dt_txt.includes("12:00:00"))
                        .map((item, index) => (
                            <ForecastCard
                                key={index}
                                date={item.dt_txt}
                                temp={item.main.temp}
                                description={item.weather[0].description}
                                icon={item.weather[0].icon}
                            />
                        ))}
                    </div>
                </>
            )

            }
        </div>
    )
}

export default CardNextDays