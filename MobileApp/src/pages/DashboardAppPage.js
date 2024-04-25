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
  const [completed, setCompleted] = useState(false)
  const theme = useTheme();
  var time = [], temp = [], humidity = []
  const [currYear, setCurrYear] = useState("")
  const navigate = useNavigate();

  function callLight(currStat) {
    fetch("http://localhost:8080/record/store", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        },
        body: JSON.stringify({light: currStat})
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
          console.log("Lights: " + data.status)
        })
  }

  function callFan(currStat) {
    fetch("http://localhost:8080/record/store", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        },
        body: JSON.stringify({fan: currStat})
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
          console.log("Fan: " + data.status)
        })
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
    try {
      const response = await fetch("http://localhost:8080/statistics", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Method": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        },
      });

      if (!response || !response.ok || response.status > 400) {
        return;
      }

      const data = await response.json();

      if (!data) return;

      for (let i = data.length - 1; i >= 0; i--) {
        time.push(data[i].time.slice(8, 10) + "/" + data[i].time.slice(5, 7) + "/" + data[i].time.slice(0, 4));
        temp.push(data[i].temp);
        humidity.push(data[i].humidity);
      }
      setCurrYear(data[0].time.slice(0, 4));
      setCompleted(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getGraphData();
    };
    fetchData();
  }, [])

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
          {completed &&
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Graph of Tempurature"
              subheader={currYear}
              chartLabels={completed? time : []}
              chartData=
                {completed? [{ name: 'Tempurature', type: 'area', fill: 'gradient', data: temp }] : []}
                typeGraph='Celsius'
            />
          </Grid>}

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
              title="Graph of Humidity"
              subheader={currYear}
              chartLabels={completed? time : []}
              chartData=
                // {[{
                //   name: 'Humidity',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // }]}
                {completed? [{ name: 'Humidity', type: 'area', fill: 'gradient', data: humidity }] : []}
                typeGraph='Percent'
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}