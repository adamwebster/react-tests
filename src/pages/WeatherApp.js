import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from '@adamwebster/fused-components';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

const Wrapper = styled(Card)`
  width: 600px;
  margin: 50px auto;
`

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('Guelph, CA');
  useEffect(() => {
    GetWeatherData(`${city}&units=metric`)
    GetForecastData(`${city}&units=metric`)
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
        const grouped = _(res.data.list)
          .groupBy(x => x.dt_txt.slice(0, -9))
          .map((value, key) => ({ date: key, weather: value }))
          .value();

        setForecast(grouped);
        console.log(grouped)
      })
  }
  const getCity = () => {
    GetWeatherData(`${city}&units=metric`)
    GetForecastData(`${city}&units=metric`)
  }
  return (
    <Wrapper boxShadow padding="20px">

      <h1>WeatherApp</h1>
      <h2>{weatherData.name}</h2>
      <br />
      <Input value={city} onChange={(e) => setCity(e.target.value)} />
      <Button onClick={() => getCity()}>Get City</Button>
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
      <h2>Five day forecast</h2>
      {forecast && forecast.map(item => {
        return (
          <Card boxShadow padding={'5px'}>
            <div>{moment(item.date).format('MMM Do YYYY').toString()}</div>
            {item.weather.map(dayWeather => {
              return (
                <div>
                  <img src={`http://openweathermap.org/img/w/${dayWeather.weather[0].icon}.png`} />

                  {moment(dayWeather.dt_txt).format('hh:mm a').toString()} {dayWeather.main.temp}</div>
              )
            })}
          </Card>
        )
      })}
    </Wrapper>
  )
}