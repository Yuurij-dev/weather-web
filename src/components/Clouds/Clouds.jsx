import './style.css'
import CloudBackground from '../../assets/cloud-background.png'


function Clouds() {
  return (
    <div className=''>
        {[...Array(6)].map((_, i) => (
            <div key={i} className={`cloud cloud${i + 1}`}>
                <img src={CloudBackground} alt="" />
            </div>
        ))}
    </div>
  )
}

export default Clouds