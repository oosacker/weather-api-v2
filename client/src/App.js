import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-grid-system';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './styles/output.css';

const App = () => {
  const [weatherData, setWeather] = useState([]);
  const [currentCity, setCurrentCity] = useState('');
  const [currentCountry, setCurrentCountry] = useState('');

  const [countryList, setcountryList] = useState(null);
  const [cityList, setcityList] = useState(null);



  useEffect( () => {
    fetchCountries();
  }, []);

  useEffect( () => {
    console.log(`currentCountry`, currentCountry);
    fetchCities();
  }, [currentCountry]);

  useEffect( () => {
    console.log(`currentCity`, currentCity);
    fetchWeather();
  }, [currentCity]);

  useEffect( () => {
    console.log(`weatherData`, weatherData);
    // fetchWeather();
  }, [weatherData]);


  const fetchCountries = () => {
    fetch('/get_countries')
      .then(response => response.json())
      .then(data => {
        setcountryList(data);
      })
      .catch(error => {
        alert(error); 
      });
  }

  const fetchCities = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country_code: currentCountry.code })
    };
    fetch('/get_cities', requestOptions)
      .then(response => response.json())
      .then(data => {
        setcityList(data);
      })
      .catch(error => {
        alert(error); 
      });
  }

  const fetchWeather = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city_id: currentCity.id })
    };

    fetch('/get_weather', requestOptions)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
      })
      .catch(error => {
        alert(error);
      });
  }


  const handleCountrySelect = (event, value, reason)=> {
    if(value) {
      setCurrentCountry(value);
    }
    else {
      console.log('no country selected');
    }
  }

  const handleCitySelect = (event, value, reason)=> {
    if(value) {
      setCurrentCity(value);
    }
    else {
      console.log('no city selected');
    }
  }

  if (!weatherData) {
    return(
      <Container className={'main-container'}>
        Please wait
      </Container>
    )
  }
  else{
    return (
      <Container className={'main-container'}>

        {countryList && (
          <Row align={'center'} justify={'center'} className={'row-1'}>
            <Autocomplete
              options={countryList}
              getOptionLabel={(country) => country.name}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
              onChange={handleCountrySelect}
            />
          </Row>
        )}

        {cityList && (
          <Row align={'center'} justify={'center'} className={'row-2'}>
            <Autocomplete
              options={cityList}
              getOptionLabel={(city) => city.name}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
              onChange={handleCitySelect}
            />
          </Row>
        )}

        {/* {weatherData && (
          <Row align={'center'} justify={'center'} className={'row-2'}>
              <Container className={'weather-result'}>
                <h3>{weatherData.name.toUpperCase()}</h3>
                <p>Temperature: {weatherData.main.temp} degC</p>
                <p>Feels like: {weatherData.main.feels_like} degC</p>
                <p>Humidity: {weatherData.main.humidity} %</p>
                <div className='weather-icon-container'>
                  <img className={'weather-icon'} src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}></img>
                </div>
                <p>{weatherData.weather[0].main +': '+ weatherData.weather[0].description} </p>
              </Container>
          </Row>
        )} */}

      </Container>
    )
  }
}

export default App;