import React, { useState, useEffect } from "react";
import { Card, Input, Button } from "@adamwebster/fused-components";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
`

export const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Guelph, CA");
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
            Get City
          </Button>
        </ButtonGroup>
        <SubTitle>{weatherData.name}</SubTitle>
        <br />
        {weatherData.weather && (
          <>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            />
            <br />
            <CurrentTemp>{weatherData.main.temp}&deg;</CurrentTemp> 
            <br />
            Feels Like: {weatherData.main.feels_like}
            <br />
            Condition: {weatherData.weather[0].main}
          </>
        )}
        <SubTitle>Five day forecast</SubTitle>
      </Inner>
      <FiveDayForecast>
        {forecast &&
          forecast.map(item => {
            return (
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
                          src={`http://openweathermap.org/img/w/${dayWeather.weather[0].icon}.png`}
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
            );
          })}
      </FiveDayForecast>
    </Wrapper>
  );
};
