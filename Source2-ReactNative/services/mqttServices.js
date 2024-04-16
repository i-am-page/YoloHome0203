import mqtt from "precompiled-mqtt";
import AIO_account from "../constances/adafruit";

const createMQTTClient = () => {
  const URL = "mqtt://io.adafruit.com";
  return mqtt.connect(URL, {
    username: AIO_account.username,
    password: AIO_account.key,
  });
};

export { createMQTTClient };
