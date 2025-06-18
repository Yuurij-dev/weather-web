import { getForeCastLocationByCity } from "../../../api/weatherLocation"
import { useState, useEffect } from "react"
import ForecastCardSearch from "./ForecastCardSearch";

import { getWeather } from "../../../api/weatherLocation";
import { useParams } from "react-router-dom";

function CardNextDaysSearch() {
    // Previsão do clima dos proximos 5 dias
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [forecastData, setForecastData] = useState(null)

    const {nomeDaCidade} = useParams()

    useEffect(() => {
        if(nomeDaCidade) {
            const decoded = decodeURIComponent(nomeDaCidade)

            setLoading(true)
            setError(null)

            getForeCastLocationByCity({city: decoded})
                .then(data => {
                    setForecastData(data)
                })
                .catch(err => {
                    console.error(err)
                    setError(err.message || "Cidade não encontrada")
                }).finally(() => setLoading(false))
        }       
    }, [nomeDaCidade])
    
    return (
        <div className="card w-[35%] bg-[#444444] text-white rounded-2xl flex flex-col items-center gap-10 ">
            <h1 className="text-2xl font-bold capitalize text-center">Previsão dos proximos 5 dias</h1>
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {forecastData && (
                <>
                    <div className="w-full flex gap-5 flex-col justify-between">
                        {forecastData.list
                        .filter((item) => item.dt_txt.includes("12:00:00"))
                        .map((item, index) => (
                            <ForecastCardSearch
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

export default CardNextDaysSearch