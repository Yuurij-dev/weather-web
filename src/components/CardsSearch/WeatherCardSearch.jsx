import humidity from '../../assets/humidity.png'
import cloud from '../../assets/cloud.png'
import pressure from '../../assets/pressure.png'
import wind from '../../assets/wind.png'
import sunrise from '../../assets/sunrise.png'
import sunset from '../../assets/sunset.png'

import { useState, useEffect } from 'react'
import { getWeather } from '../../api/weatherLocation'
import { useParams } from 'react-router-dom'
 

function WeatherCardSearch() {
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
      if(nomeDaCidade) {
        const decoded = decodeURIComponent(nomeDaCidade)
        setCity(decoded)

        getWeather(decoded).then(setData).catch(console.error)
      }
    }, [nomeDaCidade])
  
  return (
    <div className='card w-[60%] bg-[#444444] text-white rounded-2xl'>

      {data ? (
        <div className='weateher-card flex justify-between'>
          <div className='flex flex-col gap-8 justify-between'>
            <div>
              <h1 className='text-7xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent'>{parseInt(data.main.temp)}°C</h1>
              <h1 className='text-[18px] bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent'>Sensação termica: {parseInt(data.main.feels_like)}°C</h1>
            </div>

            <div className='flex flex-col gap-3 '>

              <div className='flex items-center gap-4 '>
                <img  className='w-[50px]' src={sunrise} alt="umidade-imagem" style={{ filter: 'brightness(0) invert(1)' }}/>

                <div className='flex flex-col'>
                  <span>Nascer do sol</span>
                  <span>{new Date(data.sys.sunrise * 1000).toLocaleTimeString('pt-br', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <img  className='w-[50px]' src={sunset} alt="umidade-imagem" style={{ filter: 'brightness(0) invert(1)' }}/>

                <div className='flex flex-col '>
                  <span>Pôr do sol</span>
                  <span>{new Date(data.sys.sunrise * 1000).toLocaleTimeString('pt-br', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>

            </div>
          </div>

          <div className='flex flex-col items-center text-center'>
            <img
              className='w-[200px]'
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
            />
            <h1 className='text-3xl font-bold capitalize'>{data.weather[0].description}</h1>
          </div>

          <div className='grid grid-cols-2 gap-12'>
            <div className='flex flex-col gap-2 items-center'>
              <img  className='w-[50px]' src={humidity} alt="umidade-imagem" style={{ filter: 'brightness(0) invert(1)' }}/>
              <span>{data.main.humidity}%</span>
              <span>Umidade</span>
            </div>

            <div className='flex flex-col items-center gap-2'>
              <img  className='w-[50px]' src={wind} alt="umidade-imagem" style={{ filter: 'brightness(0) invert(1)' }}/>
              <span>{parseInt(data.wind.speed)}km/h</span>
              <span>Ventos</span>
            </div>

            <div className='flex flex-col items-center gap-2'>
              <img  className='w-[50px]' src={pressure} alt="umidade-imagem" style={{ filter: 'brightness(0) invert(1)' }}/>
              <span>{parseInt(data.main.pressure)} hPa</span>
              <span>Pressão</span>
            </div>

            <div className='flex flex-col items-center gap-2'>
              <img  className='w-[50px]' src={cloud} alt="umidade-imagem" style={{ filter: 'brightness(0) invert(1)' }}/>
              <span>{parseInt(data.clouds.all)}%</span>
              <span>Nuvens</span>
            </div>
          </div>
        </div>
      ) : (
        <p>Carregando clima...</p>
      )

      }
    </div>
  )
}

export default WeatherCardSearch