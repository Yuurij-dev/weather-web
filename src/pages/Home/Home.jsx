import './styles.css'
import { Card, WeatherCard, CardNextDays, CardHourlyForecast } from '../../components'

function Home() {
  return (
    <div className='container'>
        <header className='w-full'>
            <nav className='w-full flex gap-2.5 justify-between items-center'>
                <div >
                    <span className='text-white'>Dark Mode</span>
                </div>

                <div className='w-full '>
                    <input type="text" placeholder='Procure por sua cidade de preferencia...'
                    className='w-[500px] h-[50px] rounded-3xl bg-[#444444] text-white'/>
                </div>

                <button className='bg-[#4cbb17] hover:bg-[#4dad1e] transition-all text-white rounded-3xl cursor-pointer'>Localização Atual</button>
            </nav>
        </header>

        <main className='w-full container-card flex flex-col items-start gap-15'>
            <div className='first-box w-full flex gap-15 '>
                <Card/>
                <WeatherCard/>
            </div>
            
            <div className='second-box w-full flex gap-15'>
                <CardNextDays/>
                <CardHourlyForecast/>
            </div>
        </main>
    </div>
  )
}

export default Home