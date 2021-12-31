import React, { useMemo } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const Weather = () => {
  const WeatherIcon = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(#00eaff, transparent),
      linear-gradient(-45deg, #ff2c7b, transparent),
      linear-gradient(45deg, #fff000, transparent);
    background-blend-mode: sreen;

    display: flex;

    ::before {
      position: absolute;
      content: '';
      display: inline-block;
      width: 116px;
      height: 116px;
      top: 50%;
      left: 50%;
      margin-top: -58px;
      margin-left: -58px;
      border-radius: 50%;
      background: #ffffff;
      z-index: 999;
    }
  `;

  const WeatherStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin-left: 15px;
      margin-bottom: 0;
      font-size: 1rem;
      span {
        display: inline-block;
        margin-left: 5px;
        font-size: 1.4rem;
      }
    }
  `;

  const cardStyle = useMemo(() => ({ marginTop: 10 }), []);

  return (
    <div>
      <Card title='오늘의 날씨' style={cardStyle}>
        <WeatherStyle>
          <WeatherIcon></WeatherIcon>
          <div>
            <p>따뜻하게 입으세요.</p>
            <p>
              현재 온도 <span>24°C</span>
            </p>
          </div>
        </WeatherStyle>
      </Card>
    </div>
  );
};

export default Weather;
