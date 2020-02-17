import React, { useState, useEffect, Fragment, useRef } from "react";
import { Card, Input, Button } from "@adamwebster/fused-components";
import styled, {css} from "styled-components";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {darken } from 'polished';
const Wrapper = styled(Card)`
  width: 600px;
  margin: 50px auto;
  overflow: hidden;
`;

const AppHeader = styled.div`
  background-color: #4799ff;
`;

const ForecastImage = styled.img`

`
const SubTitle = styled.h2`
  margin-bottom: 0;
  color: #4799ff;
`;

const AppTitle = styled.h1`
  margin: 0;
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  color: #fff;
  font-weight: 300;
`;

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
  display: flex;
  button {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;

const StyledInput = styled(Input)`
  width: 450px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`;

const CurrentTemp = styled.div`
  color: #4799ff;
  font-size: 4em;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  line-height: 1;
`;

const FeelsLike = styled.div`
  font-size: 0.25em;
  color: #666;
`;

const WeatherImage = styled.img`
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
`

const DayToggleItem = styled.li`

    display: inline-block;
    flex: 1 1;
    text-align: center;
    border-right: solid 1px #c5c5c5;
    padding: 5px 0;
    &:last-child{
      border-right: none;
    }
    ${props => props.active && css `
      background-color: #4799ff;
      color:#fff;
    `}
    &:hover:not(.active){
      cursor: pointer;
      background-color: ${darken(0.1, '#fff')}
    }
  
`
const DayTimeForecast = styled.div`
  display:flex;
  flex: 1 1;
`
const DayTimeForecastItem = styled.div`
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

const WeatherEmptyState = styled.div`
  display:flex;
  flex: 1 1;
  background-color: #ccc;
  border-radius: 5px;
  padding: 25px 5px;
  text-align: center;
  font-size: 11px;
  line-height: 1.5;
`
export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Guelph, CA");
  const [currentForecastShown, setCurrentForecastShown] = useState([]);
  const [activeToggle, setActiveToggle] = useState(null);
  const inputEl = useRef(null);

  useEffect(() => {
    GetWeatherData(`${city}&units=metric`);
    GetForecastData(`${city}&units=metric`, 0);
    console.log(inputEl.current);
    setActiveToggle(inputEl);
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

  const GetForecastData = (param, addDays) => {
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
        const filteredForecast = grouped.filter(item => item.date === moment().add(addDays, 'days').format('YYYY-MM-DD').toString());
        // const filterForecastTime = filteredForecast[0].weather.filter(item => item.dt_txt.indexOf('06:00') !== -1 || item.dt_txt.indexOf('12:00') !== -1 || item.dt_txt.indexOf('18:00') !== -1);
        console.log(filteredForecast)
        setCurrentForecastShown(filteredForecast);

      });
  };
  const getCity = () => {
    GetWeatherData(`${city}&units=metric`);
    GetForecastData(`${city}&units=metric`);
  };

  const refreshData = (daysToAdd) => {
    GetForecastData(`${city}&units=metric`, daysToAdd);
  }

  return (
    <Wrapper boxShadow>
      <AppHeader>
        <AppTitle>Fused Weather</AppTitle>
      </AppHeader>
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
            <WeatherImage
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
            <br />
            <CurrentTemp>
              {weatherData.main.temp}&deg;
              <FeelsLike>
                Feels like {weatherData.main.feels_like}
                <br />
                {weatherData.weather[0].main}
              </FeelsLike>
            </CurrentTemp>
          </>
        )}
        <DayToggle>
          <DayToggleItem ref={inputEl}  onClick={() => refreshData(0)} isActive={e => {return(e === activeToggle)} }>Today</DayToggleItem>
          <DayToggleItem onClick={() => refreshData(1)}>Tomorrow</DayToggleItem>
          <DayToggleItem>{moment().add(2, 'days').format('dddd')}</DayToggleItem>
        </DayToggle>
        <DayTimeForecast>
          {console.log(currentForecastShown[0])}
          {currentForecastShown[0] && currentForecastShown[0].weather.slice(0, 3).map(item => {
            return (
              <Fragment key={item.dt_txt}>
              <DayTimeForecastItem evening >
                {moment(item.dt_txt).format('h:mm a')}
                <ForecastImage
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
                {item.main.temp}&deg;c
              </DayTimeForecastItem>
           
              </Fragment>
            )
          })}
             {(currentForecastShown[0] && currentForecastShown[0].weather.slice(0, 3).length < 3) && 
                <WeatherEmptyState>No more weather for today</WeatherEmptyState>
             }
        </DayTimeForecast>
      </Inner>
    </Wrapper>
  );
};
