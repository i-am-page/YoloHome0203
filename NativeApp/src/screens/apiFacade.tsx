import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
const PORT = 8080;
//const HOST = "192.168.2.22";
//const HOST = "192.168.0.105"
const SERVERLINK = "https://yolohome-0203-server-fb7b81448a09.herokuapp.com";

var token = { token: "" };

export const apiFacade = {
  async login(username: string, password: string) {
    const res = await axios.post(
      `${SERVERLINK}/account/authenticate`,
      {
        username,
        password,
      }
    );
    return res.data;
  },
  async signup(username: string, nickname: string, password: string) {
    const res = await axios.post(`${SERVERLINK}/account/register`, {
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
    const res = await axios.get(`${SERVERLINK}/record`, {
      headers: headers,
    });
    return res.data;
  },
  async switchLight(value: number) {
    const res = await axios.post(`${SERVERLINK}/record/store`, {
      light: value,
    });
    return res.data;
  },
  async switchFan(value: number) {
    const res = await axios.post(`${SERVERLINK}/record/store`, {
      fan: value,
    });
    return res.data;
  },
  async switchDoor(value: number) {
    const res = await axios.post(`${SERVERLINK}/record/store`, {
      door: value,
    });
    return res.data;
  },
  async getChartData() {
    const res = await axios.get(`${SERVERLINK}/statistics`);
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


//                                ____DEPRECATED____
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import moment from "moment";
// const PORT = 8080;
// // const HOST = "192.168.2.21";
// const HOST = "192.168.0.105"

// var token = { token: "" };

// export const apiFacade = {
//   async login(username: string, password: string) {
//     const res = await axios.post(
//       `http://${HOST}:${PORT}/account/authenticate`,
//       {
//         username,
//         password,
//       }
//     );
//     return res.data;
//   },
//   async signup(username: string, nickname: string, password: string) {
//     const res = await axios.post(`http://${HOST}:${PORT}/account/register`, {
//       username,
//       nickname,
//       password,
//     });
//     return res.data;
//   },
//   async getRecord() {
//     const token = await AsyncStorage.getItem("token");
//     const headers = {
//       authorization: "Bearer " + token,
//     };
//     const res = await axios.get(`http://${HOST}:${PORT}/record`, {
//       headers: headers,
//     });
//     return res.data;
//   },
//   async switchLight(value: number) {
//     const res = await axios.post(`http://${HOST}:${PORT}/record/store`, {
//       light: value,
//     });
//     return res.data;
//   },
//   async switchFan(value: number) {
//     const res = await axios.post(`http://${HOST}:${PORT}/record/store`, {
//       fan: value,
//     });
//     return res.data;
//   },
//   async switchDoor(value: number) {
//     const res = await axios.post(`http://${HOST}:${PORT}/record/store`, {
//       door: value,
//     });
//     return res.data;
//   },
//   async getChartData() {
//     const res = await axios.get(`http://${HOST}:${PORT}/statistics`);
//     return {
//       labels: res.data.map((row: any) =>
//         moment(row.time).utcOffset(0).format("h:mm a")
//       ),
//       datasets: [
//         {
//           label: "Temperature",
//           backgroundColor: "#f87979",
//           data: res.data.map((row: any) => row.temp),
//           pointRadius: 0,
//           tension: 0.3,
//           borderColor: "#f87979",
//         },
//         {
//           label: "Humidity",
//           backgroundColor: "#79f8f8",
//           data: res.data.map((row: any) => row.humidity),
//           pointRadius: 0,
//           tension: 0.3,
//           borderColor: "#79f8f8",
//         },
//         {
//           label: "Luminosity",
//           backgroundColor: "#f8f879",
//           data: res.data.map((row: any) => row.lightvalue),
//           pointRadius: 0,
//           tension: 0.3,
//           borderColor: "#f8f879",
//         },
//       ],
//     };
//   }
// };
