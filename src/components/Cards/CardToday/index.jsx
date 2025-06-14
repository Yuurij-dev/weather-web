import './styles.css'

import { useState, useEffect } from 'react'
import { getForeCastLocation, getWeatherLocation } from '../../../api/weatherLocation'

function Card() {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalização não suportada pelo navegador.");
      setLoading(false)
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError("Permissão negada ou erro ao obter localização.");
        setLoading(false)
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(true)
      getWeatherLocation({ lat: location.lat, lon: location.lon })
        .then((res) => {
          setData(res)
          setLoading(false)
        })
        .catch((err) => {
          setError("Erro ao buscar dados do clima.")
          setLoading(false)
          console.error(err)
        });
    }
  }, [location]);

  return (
    <div className='card w-[40%] bg-[#444444] text-white rounded-2xl flex flex-col items-center justify-center gap-7'>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading && !error && <p>Carregando clima...</p>}

      {!loading && !error && data && (
        <>
          <h1 className='text-2xl font-bold'>{data.name}, {data.sys.country}</h1>
          <div className='flex flex-col items-center gap-1'>
            <span className='text-8xl font-bold'>{new Date(data.dt * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'})}</span>
            <span>{new Date(data.dt * 1000).toLocaleDateString('pt-BR', {weekday: 'long'})}, {new Date(data.dt * 1000).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'}).replace('.', '')}</span>
          </div>
        </>
      )

      }
    </div>
  )
}

export default Card