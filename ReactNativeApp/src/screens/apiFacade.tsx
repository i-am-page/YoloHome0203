import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const PORT = 8080;
//const HOST = "192.168.2.22";
//const HOST = "192.168.0.105"
const BASE_URL = `https://yolohome-0203-server-fb7b81448a09.herokuapp.com`;
var token = { token: "" };

export const apiFacade = {
  async login(username: string, password: string) {
    const res = await axios.post(
      `${BASE_URL}/account/authenticate`,
      {
        username,
        password,
      }
    );
    return res.data;
  },
  async signup(username: string, nickname: string, password: string) {
    const res = await axios.post(`${BASE_URL}/account/register`, {
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
    const res = await axios.get(`${BASE_URL}/record`, {
      headers: headers,
    });
    return res.data;
  },
  async switchLight(value: number) {
    const res = await axios.post(`${BASE_URL}/record/store`, {
      light: value,
    });
    return res.data;
  },
  async switchFan(value: number) {
    const res = await axios.post(`${BASE_URL}/record/store`, {
      fan: value,
    });
    return res.data;
  },
  async switchDoor(value: number) {
    const res = await axios.post(`${BASE_URL}/record/store`, {
      door: value,
    });
    return res.data;
  },
  async getChartData() {
    const res = await axios.get(`${BASE_URL}/statistics`);
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
