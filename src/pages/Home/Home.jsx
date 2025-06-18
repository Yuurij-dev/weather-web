import './styles.css'
import Mira from '../../assets/mira.png'

import { CardToday, WeatherCard, CardNextDays, CardHourlyForecast, Clouds } from '../../components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWeather } from '../../api/weatherLocation'

function Home() {
    const [error, setError] = useState(null)
    const [city, setCity] = useState('')
    const navigate = useNavigate()

    const handleSearchCity = (e) => {
        const value = e.target.value

        setCity(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()   
        if(city.trim() === ''){
            setError("Por favor, digite o nome de uma cidade")
            return
        }

        try {
            await getWeather(city)
            setError(null)
            navigate(`/city/${encodeURIComponent(city)}`)
            } catch (error) {
                setError(error.message)
                console.error("Erro ao buscar clima: ", error)
            }
    }

    const handleUserLocation = (e) => {
        navigate('/')
    }

    return (
        <div className='container'>
            <Clouds/>
            <header className='w-full'>
                {error && (
                    <div className='text-center'>
                        <p className='text-red-400 text-[16px] font-bold'>{error}</p>
                    </div>
                )}
                <nav className='w-full flex gap-2.5 justify-between items-center'>

                    <div className='w-full '>
                        <div className='w-full flex flex-col gap-5'>
                            <div className='flex justify-center'>
                                <button onClick={handleUserLocation} className='bg-[#4cbb17] hover:bg-[#4dad1e] transition-all text-white rounded-3xl cursor-pointer flex items-center'><img className='w-[40px] h-[40px]' src={Mira} alt="" /> Usar minha localização</button>
                            </div>
                            <form onSubmit={handleSubmit} className='flex gap-3'>
                                <input onChange={handleSearchCity} type="text" placeholder='Procure por sua cidade de preferencia...'
                                className='w-[500px] h-[50px] rounded-3xl text-white'/>
                                <button type='submit' className='bg-[#4cbb17] hover:bg-[#4dad1e] transition-all text-white rounded-3xl cursor-pointer'>Procurar</button>                               
                            </form>
                        </div>
                    </div>

                    
                </nav>
            </header>

            <main className='w-full container-card flex flex-col items-start gap-15'>
                <div className='first-box w-full flex gap-15 '>
                    <CardToday/>
                    <WeatherCard/>
                </div>
                
                <div className='second-box w-full flex gap-15'>
                    <CardNextDays/>
                    <CardHourlyForecast/>
                </div>
            </main>
            <Clouds/>

        </div>
    )
}

export default Home