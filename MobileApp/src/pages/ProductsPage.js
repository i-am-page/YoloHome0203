import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, ButtonGroup, Slider, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import PRODUCTS from '../_mock/products';

const SliderContainer = styled('div')({
  width: '100%',
  height: '8px',
  backgroundColor: 'grey',
  borderRadius: '9999px',
});
const CircleButton = styled('button')({
  borderRadius: '50%',
  width: '80px',
  height: '80px',
  border: '2px solid black', // thêm viền đen 2px
  cursor: 'pointer',
});


export default function ValueSlider() {
  const [value, setValue] = useState(50);

  const [color, setColor] = useState('');


  const [data, setData] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [data1, setData1] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const API_LINK = `https://io.adafruit.com/api/v2/KhoiTran0909/feeds/den-4-leb`;
      const headers = {
        'X-AIO-Key': ''
      };
      fetch(API_LINK, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => {
          setData(data.last_value);
          setIsOn(data.last_value === "ON");
        });
      fetch('https://io.adafruit.com/api/v2/KhoiTran0909/feeds/den-4-leb', {
        method: 'GET',
        headers
      })
        .then(response => response.json())
        .then(data1 => setData1(data1.last_value));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const API_LINK = `https://io.adafruit.com/api/v2/KhoiTran0909/feeds/denthaymau`;
  //     const headers = {
  //       'X-AIO-Key': ''
  //     };
  //     fetch(API_LINK, { method: 'GET', headers })
  //       .then(response => response.json())
  //       .then(color => {
  //         setData(color.last_value);
  //         setIsOn(color.last_value);
  //       });
  //     fetch('https://io.adafruit.com/api/v2/KhoiTran0909/feeds/denthaymau', {
  //       method: 'GET',
  //       headers
  //     })
  //       .then(response => response.json())
  //       .then(color1 => setData1(color1.last_value));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);




  return (
    <>
      <Typography id="discrete-slider" gutterBottom>
        Brigthness: {data}
      </Typography>
      <Slider
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={100}
        value={Number(data)}
        style={{ width: '300px', height: '20px' }}
      />
       <div>
      <CircleButton style={{ backgroundColor: {color} }}  />
      <p>You selected {color} color.</p>
    </div>
    </>
  );
}
