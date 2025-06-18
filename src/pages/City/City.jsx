import './styles.css'
import { CardTodaySearch, WeatherCardSearch, CardNextDaysSearch, CardHourlyForecastSearch, Clouds } from '../../components'

import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { getWeather } from '../../api/weatherLocation'

function City() {
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
                        <form onSubmit={handleSubmit} className='flex gap-3'>
                            <input onChange={handleSearchCity} type="text" placeholder='Procure por sua cidade de preferencia...'
                            className='w-[500px] h-[50px] rounded-3xl text-white'/>
                            <button type='submit' className='bg-[#4cbb17] hover:bg-[#4dad1e] transition-all text-white rounded-3xl cursor-pointer'>Procurar</button>
                        </form>

                        
                    </div>
                </nav>
            </header>

            <main className='w-full container-card flex flex-col items-start gap-15'>
                <div className='first-box w-full flex gap-15 '>
                    <CardTodaySearch/>
                    <WeatherCardSearch/>
                </div>
                
                <div className='second-box w-full flex gap-15'>
                    <CardNextDaysSearch/>
                    <CardHourlyForecastSearch/>
                </div>
            </main>
        </div>
    )
}

export default City