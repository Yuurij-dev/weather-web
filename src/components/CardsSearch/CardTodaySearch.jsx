
import { useState, useEffect } from 'react'
import { getWeather } from '../../api/weatherLocation'

import { useParams } from 'react-router-dom';

function CardTodaySearch() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalização não suportada pelo navegador.");
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
      }
    );
  }, []);

  const {nomeDaCidade} = useParams()
  const [city, setCity] = useState("")
  const [data, setData] = useState(null)

  useEffect(() => {
    if(nomeDaCidade){
      const decoded = decodeURIComponent(nomeDaCidade)
      setCity(decoded)

      getWeather(decoded).then(setData).catch(console.error)
    }
  }, [nomeDaCidade])


  return (
    <div className='card w-[40%] bg-[#444444] text-white rounded-2xl flex flex-col items-center justify-center gap-7'>

      {data ? (
        <>
          <h1 className='text-2xl font-bold'>{data.name}, {data.sys.country}</h1>
          <div className='flex flex-col items-center gap-1'>
            <span className='text-8xl font-bold'>
              {new Date((data.dt + data.timezone) * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})}</span>
            <span>{new Date(data.dt * 1000).toLocaleDateString('pt-BR', {weekday: 'long'})}, {new Date(data.dt * 1000).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'}).replace('.', '')}</span>
          </div>
        </>
      ) : (
        <p>Carregando clima...</p>
      )

      }
    </div>
  )
}

export default CardTodaySearch