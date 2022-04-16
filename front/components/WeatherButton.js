import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const WeatherButton = ({ location, onLocationSelect }) => {
  const locationArr = [
    {
      name: '서울',
      value: 'Seoul'
    },
    {
      name: '대전',
      value: 'Daejeon'
    },
    {
      name: '강릉',
      value: 'Gangneung'
    },
    {
      name: '광주',
      value: 'Gwangju'
    },
    {
      name: '부산',
      value: 'Busan'
    },
    {
      name: '제주',
      value: 'Jeju'
    }
  ];

  const Button = styled.button`
    padding: 0 10px;
    line-height: 2rem;
    margin-right: 10px;
    background-color: #dfdfde;
    color: #8d8daa;
    border: none;
    border-radius: 4px;
    &.active {
      color: #ffffff;
      background-color: #8d8daa;
    }
  `;

  useEffect(() => {
    console.log(location);
  });

  return (
    <>
      {locationArr.map((names, index, e) => (
        <Button
          key={names.value}
          id={index}
          className={`${location === names.value ? 'active' : ''}`}
          value={names.value}
          onClick={onLocationSelect}
        >
          {names.name}
        </Button>
      ))}
    </>
  );
};

export default WeatherButton;
