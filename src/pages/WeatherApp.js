import React, { useState, useEffect, Fragment } from "react";
import { Card, Input, Button } from "@adamwebster/fused-components";
import styled, { css } from "styled-components";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { darken } from 'polished';

const Wrapper = styled(Card)`
  width: 320px;
  margin: 50px auto;
  overflow: hidden;
`;

const City = styled.h2`
  margin-bottom: 0;
  text-align:center;
  font-size:1.2em;
  margin-top: 0;
  font-weight: 100;
`

const AppTitle = styled.h1`
  margin: 0;
  text-align:center;
  padding: 15px;
  box-sizing:border-box;
  color: #fff;
  font-weight: 300;
`

const Inner = styled.div`
  padding: 20px;
`;

const ButtonGroup = styled.div`
  display:flex;
  button{
    border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  }
`

const StyledInput = styled(Input)`
  width: 210px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`

const CurrentTemp = styled.div`
    font-size: 4em;
    margin: 0 auto;
    width: 100%;
    text-align: center;
    line-height: 1;
`
const FeelsLike = styled.div`
  font-size: 1.2em;
  width: 100%;
  text-align:center;
`

const ForecastImage = styled.img`
  width: 100px;
  height: auto;
  margin: 0 auto;
  display: block;
 
`
const DayToggle = styled.ul`
margin: 10px auto;
display: flex;
flex: 1 1;
list-style: none;
border: solid 1px #c5c5c5;
border-radius: 5px;
padding: 0;
overflow: hidden;
width: 250px;
  li{
    display: inline-block;
    flex: 1 1;
    text-align: center;
    border-right: solid 1px #c5c5c5;
    padding: 5px 0;
    &:last-child{
      border-right: none;
    }
    &.active{
      background-color: #4799ff;
      color:#fff;
    }
    &:hover:not(.active){
      cursor: pointer;
      background-color: ${darken(0.1, '#fff')}
    }
  }
`
const DayTimeForecast = styled.div`
  display:flex;
  flex: 1 1;
`
const DayTimeForecastItem = styled.div `
text-align: center;
  display:flex;
  flex: 1 1;
  flex-flow:column;
  border: solid 1px #ccc;
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
  color: #fff;
  img{
    width: 50px;
    border: none;
    background-color:  transparent;
    box-shadow:none;
  }
  &:last-child{ 
    margin-right: 0;
  }
  ${props => props.morning && css`
    background-color: #14445a;
  `}

  ${props => props.afternoon && css`
    background-color: #fd683c;
  `}

  ${props => props.evening && css`
    background-color: #3a1e46;
  `}
`
export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Guelph, CA");
  const [currentForecastShown, setCurrentForecastShown] = useState([]);

  useEffect(() => {
    GetWeatherData(`${city}&units=metric`);
    GetForecastData(`${city}&units=metric`);
  }, []);

  const GetWeatherData = param => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${process.env.REACT_APP_OPENWEATHER_APIKEY}`
      )
      .then(res => {
        console.log(res.data);
        setWeatherData(res.data);
      });
  };

  const GetForecastData = param => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${param}&appid=${process.env.REACT_APP_OPENWEATHER_APIKEY}`
      )
      .then(res => {
        const grouped = _(res.data.list)
          .groupBy(x => x.dt_txt.slice(0, -9))
          .map((value, key) => ({ date: key, weather: value }))
          .value();

        setForecast(grouped);
        const filteredForecast = grouped.filter(item => item.date === moment().add(1, 'days').format('YYYY-MM-DD').toString());
        const filterForecastTime = filteredForecast[0].weather.filter(item => item.dt_txt.indexOf('06:00') !== -1 || item.dt_txt.indexOf('12:00') !== -1 || item.dt_txt.indexOf('18:00') !== -1);

        setCurrentForecastShown(filterForecastTime);

      });
  };
  const getCity = (e) => {
    e.preventDefault();
    GetWeatherData(`${city}&units=metric`);
    GetForecastData(`${city}&units=metric`);
  };
  return (
    <Wrapper boxShadow>
      <Inner>
        <form onSubmit={(e) => getCity(e)}>
        <ButtonGroup>
          <StyledInput icon={<FontAwesomeIcon icon="search" />} width='70%' value={city} onChange={e => setCity(e.target.value)} />
          <Button primary >
            Search
          </Button>
        </ButtonGroup>
        </form>
        <br />
        {weatherData.weather && (
          <>
            <ForecastImage
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
            <br />
            <CurrentTemp>{weatherData.main.temp}&deg;c</CurrentTemp>
            <FeelsLike>Feels Like {weatherData.main.feels_like}&deg;
           <br />
              {weatherData.weather[0].main}
            </FeelsLike>
            <City>{weatherData.name}</City>
          </>
        )}
        <DayToggle>
          <li className={'active'}>Today</li>
          <li>Tomorrow</li>
          <li>{moment().add(2, 'days').format('dddd')}</li>
        </DayToggle>
        <DayTimeForecast>
          {console.log(currentForecastShown)}
          {currentForecastShown && currentForecastShown.map(item => {
            return (

              <Fragment key={item.dt_txt}>
                {item.dt_txt.includes('06:00') && (
                  <DayTimeForecastItem morning>
                    Morning
                  <ForecastImage
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    />
                    {item.main.temp}&deg;c
                  </DayTimeForecastItem>
                )}
                {item.dt_txt.includes('12:00') && (
                  <DayTimeForecastItem afternoon>

                    Afternoon
                     <ForecastImage
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    />
                    {item.main.temp}&deg;c
                  </DayTimeForecastItem>
                )}
                {item.dt_txt.includes('18:00') && (
                  <DayTimeForecastItem evening>
                    Evening
                      <ForecastImage
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    />
                    {item.main.temp}&deg;c
                  </DayTimeForecastItem>
                )}
              </Fragment>
            )
          })}
        </DayTimeForecast>
      </Inner>
    </Wrapper>
  );
};
