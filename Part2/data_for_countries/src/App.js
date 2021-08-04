import React , {useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ country }) => {
  const [weather, setWeather] = useState();
  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then((response)=> setWeather(response.data.current))
  }
  useEffect(hook,[])

  console.log(weather)

  return weather ? (
    <div>
      <h2>Weather in {country.capital} </h2>
      <p>
        <strong>temperature:</strong> {weather.temperature} Celcius
      </p>
      <img
        src={weather.weather_icons}
        width="80"
        height="80"
        alt={weather.weather_descriptions[0]}
      />
      <p>
        <strong>wind:</strong> {weather.wind_speed} mph direction{" "}
        {weather.wind_dir}
      </p>
    </div>
  ) : (
    <div>Loading</div>
  );
};

const Countries = ({filteredCountries}) => {
  const[showCountry, setShowCountry]=useState()
  
  if(filteredCountries==="" || filteredCountries.length >= 10){
    return <div>Too many matches, specify another filter</div>
  }
  else if(filteredCountries.length === 1){
    return filteredCountries.map((country, i) => (
      <div key = {i}>
      <h1> {country.name} </h1>
      <p>capital: {country.capital} </p>
      <p>population: {country.population} </p>
      <h3> languages </h3>
      <ul>
        {country.languages.map((language, i) => (
          <li key={i}> {language.name} </li>
        ))}
      </ul>
      <div>
        <img src={country.flag} alt={country.name} width="150" length="150" />
      </div>
      <Weather country={country}/>
      </div>
    ))
  }
  else if(showCountry){
    return (
      <div>
      <h1> {showCountry.name} </h1>
      <p>capital: {showCountry.capital} </p>
      <p>population: {showCountry.population} </p>
      <h3> languages </h3>
      <ul>
        {showCountry.languages.map((language, i) => (
          <li key={i}> {language.name} </li>
        ))}
      </ul>
      <div>
        <img src={showCountry.flag} alt={showCountry.name} width="150" length="150" />
      </div>
      <Weather country={showCountry}/>
      </div>
    )
  }
  else {
    return filteredCountries.map((country, i) => (
      <div key={i}>
        {country.name}
        <button onClick={ () => setShowCountry(country)}>show</button>
      </div>
    ));
  }

}


const App = () => {
  const[countries,setCountries]=useState([])
  const[searchText,setSearchText]=useState("")

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("promise fulfilled")
        setCountries(response.data)
      })
  }
  useEffect(hook,[])

  const handleSearchText = (event) => {
    event.preventDefault()
    setSearchText(event.target.value)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchText.toLowerCase()))


  return (
    <>
    
    find countries<input value={searchText} onChange={handleSearchText}/>
    {filteredCountries ? (
      <Countries filteredCountries={filteredCountries}/>
    ):(
      <div>
        Loading
      </div>
    )
    }

    </>
  )

}

export default App