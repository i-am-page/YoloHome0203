import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Iconify from '../components/iconify';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { light } from '@mui/material/styles/createPalette';
import { array } from 'prop-types';
import { set } from 'lodash';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [lightStat, setLightStat] = useState("Off")
  const [fanStat, setFanStat] = useState("Off")
  const [once, setOnce] = useState(true)
  const [completed, setCompleted] = useState(false)
  const theme = useTheme();
  var time = [], temp = [], humidity = []
  const [currYear, setCurrYear] = useState("")
  const navigate = useNavigate();
  // useEffect(() => {
  //   if(sessionStorage.getItem('username')===null){
  //     navigate('/login', { replace: true });
  //     }    
  // },[])
  function callLight(currStat) {
    console.log(currStat)
    // fetch("http://localhost:8080/record/store", {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Method": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
    //     },
    //     body: JSON.stringify({light: currStat})
    //   })
    //     .catch((err) => {return})
    //     .then((res) => {
    //       if (!res || !res.ok || res.status > 400) {
    //         return;
    //       }
    //       return res.json();
    //     })
    //     .then((data) => {
    //       if (!data) return;
    //       console.log(data)
    //     })
  }

  function callFan(currStat) {
    console.log(currStat)
    // fetch("http://localhost:8080/record/store", {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Method": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
    //     },
    //     body: JSON.stringify({fan: currStat})
    //   })
    //     .catch((err) => {return})
    //     .then((res) => {
    //       if (!res || !res.ok || res.status > 400) {
    //         return;
    //       }
    //       return res.json();
    //     })
    //     .then((data) => {
    //       if (!data) return;
    //       console.log(data)
    //     })
  }

  function handleClickLight(e) {
    if (lightStat === "On") {
      setLightStat("Off")
      callLight(false)
    }
    else {
      setLightStat("On")
      callLight(true)
    }
    e.preventDefault()
  }

  function handleClickFan(e) {
    if (fanStat === "On") {
      setFanStat("Off")
      callFan(false)
    }
    else {
      setFanStat("On")
      callFan(true)
    }
    e.preventDefault()
  }

  async function getGraphData() {
    fetch("http://localhost:8080/statistics", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        },
      })
        .catch((err) => {return})
        .then((res) => {
          if (!res || !res.ok || res.status > 400) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          console.log(data)
          for (let i = data.length; i > 0; i--) {
            time.push(data[i-1].time.slice(8,10) + "/" + data[i - 1].time.slice(5, 7) + "/" + data[i - 1].time.slice(0,4))
            temp.push(data[i-1].temp)
            humidity.push(data[i-1].humidity)
            if ((i-1)===0) setCompleted(true)
          }
          setCurrYear(data[0].time.slice(0, 4))
        })
  }
  if (once) {
    getGraphData()
    setOnce(false)
  }
  
  return (
    <>
      <Helmet>
        <title> Dashboard Smart Home </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {localStorage.user}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <button onClick={handleClickLight} style={{ width: '100%' , border: 'none' , background: 'transparent'}}><AppWidgetSummary title={lightStat} total="Light" icon={'ant-design:bulb-outlined'}/><bulbOutlined /></button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <button onClick={handleClickFan} style={{ width: '100%' , border: 'none' , background: 'transparent'}}><AppWidgetSummary title={fanStat} total="Fan" color="info" icon={'ant-design:thunderbolt-outlined'} /></button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Check" total="Check Brightness" color="warning" icon={'ant-design:alert-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Check" total="Check Tempurature and Humidity" color="info" icon={'ant-design:copyright-outlined'} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Check" total="Check of Infrared for People Detection" color="error" icon={'ant-design:compress-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Graph of Tempurature"
              subheader={currYear}
              chartLabels={time}
              chartData={[
                // {
                //   name: 'Team A',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                {
                  name: 'Tempurature',
                  type: 'area',
                  fill: 'gradient',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                // {
                //   name: 'Tempurature',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 29, 27, 21, 32,24, 32, 29, 26, 29],
                // },
              ]}
              typeGraph='Celsius'
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'A', value: 4344 },
                { label: 'B', value: 5435 },
                { label: 'C', value: 1443 },

              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
              ]}
            />
          </Grid>


          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Graph of Tempurature and Humidity"
              subheader="2023"
              chartLabels={[
                '03/01/2003',
                '03/03/2003',
                '03/07/2003',
                '03/10/2003',
                '03/13/2003',
                '03/16/2003',
                '03/18/2003',
                '03/20/2003',
                '03/24/2003',
                '03/28/2003',
                '03/31/2003',
              ]}
              chartData={[
                // {
                //   name: 'Team A',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                {
                  name: 'Humidity',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Tempurature',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 29, 27, 21, 32,24, 32, 29, 26, 29],
                },
              ]}
            />
          </Grid>











          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}