import React, { useState, useEffect } from "react";
import { Card, Input, Button } from "@adamwebster/fused-components";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { darken } from 'polished';

const Wrapper = styled(Card)`
  width: 600px;
  margin: 50px auto;
  overflow: hidden;
`;

const AppHeader = styled.div`
  background-color: #4799ff;
  
`;

const SubTitle = styled.h2`
  margin-bottom: 0;
  color: #4799ff;
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

const FiveDayForecast = styled.div`
  background-color: #666;
  height: 300px;
  overflow: auto;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
`;

const Day = styled.div`
  margin-bottom: 15px;
  color: #fff;
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;

  }
  border-bottom: solid 1px #868686;
  padding-bottom: 10px;
`;

const Date = styled.div`
  font-size: 18px;
  color: #ccc;
  padding: 5px;
`;

const DayInner = styled.div`
  padding: 5px;
`;

const ButtonGroup = styled.div`
  display:flex;
  button{
    border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  }
`

const StyledInput = styled(Input)`
  width: 450px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`

const CurrentTemp = styled.div`
    color: #4799ff;
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
  background-color: #4799ff;
  border-radius:50%;
  border: solid 5px #fff;
  box-shadow: 0 0 15px #ccc;
`
const DayToggle = styled.ul`
margin: 10px 0;
display: flex;
flex: 1 1;
list-style: none;
border: solid 1px #c5c5c5;
border-radius: 15px;
padding: 0;
overflow: hidden;
  li{
    display: inline-block;
    flex: 1 1;
    text-align: center;
    border-right: solid 1px #c5c5c5;
    padding: 10px 0;
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
        console.log(filterForecastTime);
        
        setCurrentForecastShown(filterForecastTime);
        console.log(grouped);
      });
  };
  const getCity = () => {
    GetWeatherData(`${city}&units=metric`);
    GetForecastData(`${city}&units=metric`);
  };
  return (
    <Wrapper boxShadow>
      <AppHeader>
        <AppTitle>Fused Weather</AppTitle>
      </AppHeader>
      <Inner>
        <ButtonGroup>
          <StyledInput icon={<FontAwesomeIcon icon="search" />} width='70%' value={city} onChange={e => setCity(e.target.value)} />
          <Button primary onClick={() => getCity()}>
            Search
          </Button>
        </ButtonGroup>
        <SubTitle>{weatherData.name}</SubTitle>
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

          </>
        )}
        <DayToggle>
          <li className={'active'}>Today</li>
          <li>Tomorrow</li>
          <li>{moment().add(2, 'days').format('dddd')}</li>
        </DayToggle>
        <div>
          {console.log(currentForecastShown)}
          {currentForecastShown && currentForecastShown.map(item => {
            return(
           
              <>
                {item.dt_txt.includes('06:00') && (
                <div>
                  Morning
                {item.main.temp}
                </div>
                )}
                {item.dt_txt.includes('12:00') && (
                <div>
                Afternoon
                {item.main.temp}
                </div>
                )}
                {item.dt_txt.includes('18:00') && (
                <div>
                Evening
                {item.main.temp}
                </div>
                )}
              </>
            )
          })}
        </div>
      </Inner>
      <div>

      </div>
      <FiveDayForecast>
        {forecast &&
          forecast.map(item => {
            return (
              <>
                {moment(item.date) < moment().add(2, 'days') && (
                  <Day>
                    <Date>
                      {moment(item.date)
                        .format("MMM Do YYYY")
                        .toString()}
                    </Date>
                    <DayInner>
                      {" "}
                      {item.weather.map(dayWeather => {
                        return (
                          <div>
                            <img
                              src={`http://openweathermap.org/img/wn/${dayWeather.weather[0].icon}.png`}
                            />
                            {moment(dayWeather.dt_txt)
                              .format("hh:mm a")
                              .toString()}{" "}
                            {dayWeather.main.temp}
                          </div>
                        );
                      })}
                    </DayInner>
                  </Day>
                )
                }
              </>
            );
          })}
      </FiveDayForecast>
    </Wrapper>
  );
};
