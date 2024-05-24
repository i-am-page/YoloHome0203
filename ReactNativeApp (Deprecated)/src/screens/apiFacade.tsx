import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const PORT = 8080;
//const HOST = "192.168.2.22";
//const HOST = "192.168.0.105"
<<<<<<< HEAD:ReactNativeApp/src/screens/apiFacade.tsx
const BASE_URL = `https://yolohome-0203-server-fb7b81448a09.herokuapp.com`;
=======
const SERVERLINK = "https://yolohome-0203-server-fb7b81448a09.herokuapp.com";

>>>>>>> 542dcff09c157fab5a5811688b2e6ce519134659:ReactNativeApp (Deprecated)/src/screens/apiFacade.tsx
var token = { token: "" };

export const apiFacade = {
  async login(username: string, password: string) {
    const res = await axios.post(
<<<<<<< HEAD:ReactNativeApp/src/screens/apiFacade.tsx
      `${BASE_URL}/account/authenticate`,
=======
      `${SERVERLINK}/account/authenticate`,
>>>>>>> 542dcff09c157fab5a5811688b2e6ce519134659:ReactNativeApp (Deprecated)/src/screens/apiFacade.tsx
      {
        username,
        password,
      }
    );
    return res.data;
  },
  async signup(username: string, nickname: string, password: string) {
<<<<<<< HEAD:ReactNativeApp/src/screens/apiFacade.tsx
    const res = await axios.post(`${BASE_URL}/account/register`, {
=======
    const res = await axios.post(`${SERVERLINK}/account/register`, {
>>>>>>> 542dcff09c157fab5a5811688b2e6ce519134659:ReactNativeApp (Deprecated)/src/screens/apiFacade.tsx
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
<<<<<<< HEAD:ReactNativeApp/src/screens/apiFacade.tsx
    const res = await axios.get(`${BASE_URL}/record`, {
=======
    const res = await axios.get(`${SERVERLINK}/record`, {
>>>>>>> 542dcff09c157fab5a5811688b2e6ce519134659:ReactNativeApp (Deprecated)/src/screens/apiFacade.tsx
      headers: headers,
    });
    return res.data;
  },
  async switchLight(value: number) {
<<<<<<< HEAD:ReactNativeApp/src/screens/apiFacade.tsx
    const res = await axios.post(`${BASE_URL}/record/store`, {
=======
    const res = await axios.post(`${SERVERLINK}/record/store`, {
>>>>>>> 542dcff09c157fab5a5811688b2e6ce519134659:ReactNativeApp (Deprecated)/src/screens/apiFacade.tsx
      light: value,
    });
    return res.data;
  },
  async switchFan(value: number) {
<<<<<<< HEAD:ReactNativeApp/src/screens/apiFacade.tsx
    const res = await axios.post(`${BASE_URL}/record/store`, {
=======
    const res = await axios.post(`${SERVERLINK}/record/store`, {
>>>>>>> 542dcff09c157fab5a5811688b2e6ce519134659:ReactNativeApp (Deprecated)/src/screens/apiFacade.tsx
      fan: value,
    });
    return res.data;
  },
  async switchDoor(value: number) {
<<<<<<< HEAD:ReactNativeApp/src/screens/apiFacade.tsx
    const res = await axios.post(`${BASE_URL}/record/store`, {
=======
    const res = await axios.post(`${SERVERLINK}/record/store`, {
>>>>>>> 542dcff09c157fab5a5811688b2e6ce519134659:ReactNativeApp (Deprecated)/src/screens/apiFacade.tsx
      door: value,
    });
    return res.data;
  },
  async getChartData() {
<<<<<<< HEAD:ReactNativeApp/src/screens/apiFacade.tsx
    const res = await axios.get(`${BASE_URL}/statistics`);
=======
    const res = await axios.get(`${SERVERLINK}/statistics`);
>>>>>>> 542dcff09c157fab5a5811688b2e6ce519134659:ReactNativeApp (Deprecated)/src/screens/apiFacade.tsx
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