import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import MainColor from "../mainColor/mainColor";
import FontText from "../fontText/fontText";
import AIO_account from "../../constances/adafruit";

const WeatherWidget = () => {
  const [temps, setTemps] = useState(32);

  const feedKey = "nhiet-do";

  const url = `https://io.adafruit.com/api/v2/${AIO_account.username}/feeds/${feedKey}/data/last`;

  useEffect(() => {
    fetch(url, {
      headers: {
        "X-AIO-Key": AIO_account.key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Latest value:", data.value);
        setTemps(data.value);
      })
      .catch((error) => {
        console.error("Failed to fetch latest value:", error);
      });
  }, []);

  const mqtt = require("precompiled-mqtt");
  const client = mqtt.connect("mqtts://io.adafruit.com/", {
    username: AIO_account.username,
    password: AIO_account.key,
  });

  const feedTopic = "nghiachutuan68/feeds/nhiet-do";

  client.on("connect", () => {
    console.log("MQTT Connected!");

    client.subscribe(feedTopic, { qos: 1 }, (err) => {
      if (err) {
        console.error("Failed to subscribe to feed:", err);
      } else {
        console.log("Subscribed to feed successfully!");
      }
    });
  });

  client.on("message", function (topic, message) {
    console.log("Received message of nhiet-do:", message.toString());
    setTemps(message.toString());
  });

  return (
    <MainColor style={styles.weatherWidgetContainer}>
      <View style={styles.locationFrame}>
        <FontText font="SF-Pro-Display-Bold" style={styles.locationTitle}>
          My Location
        </FontText>
        <FontText font="SF-Pro-Display-Regular" style={styles.city}>
          Ho Chi Minh
        </FontText>
      </View>
      <View style={styles.tempsFrame}>
        <FontText font="SF-Pro-Display-RegularItalic" style={styles.temps}>
          {temps}°C
        </FontText>
      </View>
    </MainColor>
  );
};

export default WeatherWidget;

const styles = StyleSheet.create({
  weatherWidgetContainer: {
    width: "100%",
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 110,
  },
  locationFrame: {
    padding: 10,
  },
  locationTitle: {
    fontSize: 22,
    color: "#FFF",
  },
  city: {
    fontSize: 13,
    color: "#FFF",
    opacity: 0.6,
  },
  tempsFrame: {
    justifyContent: "center",
    paddingRight: 25,
  },
  temps: {
    fontSize: 44,
    color: "#FFF",
  },
});
