import React, { useState, useEffect } from 'react';
import { Card } from '@adamwebster/fused-components';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled(Card)`
  width: 600px;
  margin: 50px auto;
`

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    GetWeatherData('Guelph,ca&units=metric')
    GetForecastData('Guelph,ca&units=metric&cnt=3')
  }, [])

  const GetWeatherData = (param) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${process.env.REACT_APP_OPENWEATHER_APIKEY}`)
      .then(res => {
        console.log(res.data); setWeatherData(res.data)
      })
  }

  const GetForecastData = (param) => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${param}&appid=${process.env.REACT_APP_OPENWEATHER_APIKEY}`)
    .then(res => {
      console.log(res.data); setForecast(res.data)
    })
  }
  return (
    <Wrapper boxShadow padding="20px">

      <h1>WeatherApp</h1>
      <h2>{weatherData.name}</h2>
      <br />

      {weatherData.weather &&
        <>
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
          <br />
          Current Temperature: {weatherData.main.temp}
          <br />
          Feels Like: {weatherData.main.feels_like}
          <br />
          Condition: {weatherData.weather[0].main}
        </>
      }
    </Wrapper>
  )
}