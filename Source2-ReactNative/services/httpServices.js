import axios from "axios";

import AIO_account from "../constances/adafruit";

const BACKEND_URL =
  "https://react-native-course-f3f0a-default-rtdb.asia-southeast1.firebasedatabase.app";


const sendToAdafruitIO = async (device) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "X-AIO-Key": AIO_account.key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: device.power }),
  };
  const response = await fetch(
    `https://io.adafruit.com/api/v2/${AIO_account.username}/feeds/${device.aio_feed_name}/data`,
    requestOptions
  );
  if (!response.ok) {
    console.error("Failed to send data to Adafruit IO");
  } else {
    console.log("Send completely!!");
  }
};


const storeUser = (userData) => {
  axios.post(`${BACKEND_URL}/users.json`, userData);
  console.log("Store Success!");
};

const fetchUsers = async (userData) => {
  const response = await axios.get(`${BACKEND_URL}/users.json`, userData);

  const users = [];

  for (const key in response.data) {
    const userObj = {
      id: key,
      name: response.data[key].name,
      email: response.data[key].email,
      pass: response.data[key].pass,
    };
    users.push(userObj);
  }

  console.log(users);
};

export { sendToAdafruitIO, storeUser };
