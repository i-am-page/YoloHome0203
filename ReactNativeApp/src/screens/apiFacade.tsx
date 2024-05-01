import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const PORT = 8080;
const HOST = "192.168.0.100";
var token = { token: "" };

export const apiFacade = {
  async login(username: string, password: string) {
    const res = await axios.post(
      `http://${HOST}:${PORT}/account/authenticate`,
      {
        username,
        password,
      }
    );
    token = res.data;
    return res.data;
  },
  async signup(username: string, nickname: string, password: string) {
    const res = await axios.post(`http://${HOST}:${PORT}/account/register`, {
      username,
      nickname,
      password,
    });
    return res.data;
  },
  async getRecord() {
    const token = await AsyncStorage.getItem("token");
    const headers = {
      authorization: "Bearer " + token,
    };
    console.log(headers);
    const res = await axios.get(`http://${HOST}:${PORT}/record`, {
      headers: headers,
    });
    return res.data;
  },
  async switchLight(value: number) {
    const res = await axios.post(`http://${HOST}:${PORT}/record/store`, {
      light: value,
    });
    return res.data;
  },
  async switchFan(value: number) {
    const res = await axios.post(`http://${HOST}:${PORT}/record/store`, {
      fan: value,
    });
    return res.data;
  },
  async switchDoor(value: number) {
    const res = await axios.post(`http://${HOST}:${PORT}/record/store`, {
      door: value,
    });
    return res.data;
  },
  async getChartData() {
    const res = await axios.get(`http://${HOST}:${PORT}/statistics`);
    return {
      labels: res.data.map((row: any) =>
        moment(row.time).utcOffset(0).format("h:mm a")
      ),
      datasets: [
        {
          label: "Temperature",
          backgroundColor: "#f87979",
          data: res.data.map((row: any) => row.temp),
          pointRadius: 0,
          tension: 0.3,
          borderColor: "#f87979",
        },
        {
          label: "Humidity",
          backgroundColor: "#79f8f8",
          data: res.data.map((row: any) => row.humidity),
          pointRadius: 0,
          tension: 0.3,
          borderColor: "#79f8f8",
        },
        {
          label: "Luminosity",
          backgroundColor: "#f8f879",
          data: res.data.map((row: any) => row.lightvalue),
          pointRadius: 0,
          tension: 0.3,
          borderColor: "#f8f879",
        },
      ],
    };
  }
};
