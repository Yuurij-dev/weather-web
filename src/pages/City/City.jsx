import './styles.css'
import { CardTodaySearch, WeatherCardSearch, CardNextDaysSearch, CardHourlyForecastSearch } from '../../components'

import {useEffect, useState} from 'react'
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if(city.trim() !== ''){
            navigate(`/city/${encodeURIComponent(city)}`)
        }
    }

    return (
        <div className='container'>
            <header className='w-full'>
                <nav className='w-full flex gap-2.5 justify-between items-center'>
                    <div >
                        <span className='text-white'>Dark Mode</span>
                    </div>

                    <div className='w-full '>
                        <form onSubmit={handleSubmit} className='flex gap-3'>
                            <input onChange={handleSearchCity} type="text" placeholder='Procure por sua cidade de preferencia...'
                            className='w-[500px] h-[50px] rounded-3xl bg-[#444444] text-white'/>
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