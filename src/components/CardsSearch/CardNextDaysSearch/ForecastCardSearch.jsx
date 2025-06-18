function ForecastCardSearch({ date, temp, description, icon }) {
  const day = (new Date(date).toLocaleDateString("pt-BR", { weekday: "long" }) + ' ' + new Date(date).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'}).replace('de', '').replace('.', ''))
  
  return (
    <div className="card-previsao w-full gap-2.5 h-20 flex items-center justify-between">
      <img
        className="w-25 h-25"
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      <p className="font-medium">{temp.toFixed(1)}°C</p>
      <p className="capitalize font-bold">{day}</p>
    </div>
  );
}

export default ForecastCardSearch;