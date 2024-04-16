import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import MainColor from "../mainColor/mainColor";
import FontText from "../fontText/fontText";
import { useEffect, useState } from "react";

import AIO_account from "../../constances/adafruit";

const CondCard = (props) => {
  const [value, setValue] = useState(40);

  const feedKey = props.feedKey;

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
        setValue(data.value);
      })
      .catch((error) => {
        console.error("Failed to fetch latest value:", error);
      });

    const mqtt = require("precompiled-mqtt");
    const client = mqtt.connect("mqtts://io.adafruit.com/", {
      username: AIO_account.username,
      password: AIO_account.key,
    });

    const feedTopic = `nghiachutuan68/feeds/${feedKey}`;

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
      console.log(`Received message of ${feedKey}:`, message.toString());
      setValue(message.toString());
    });
  }, []);

  return (
    <View style={styles.condCard}>
      <MainColor style={{ borderRadius: 60 }}>
        <View style={styles.cardImage}>
          <MaterialCommunityIcons name={props.icon} size={44} color="white" />
        </View>
      </MainColor>
      <FontText font="SF-Pro-Display-RegularItalic" style={styles.title}>
        {props.title}
      </FontText>
      <FontText font="SF-Pro-Display-RegularItalic" style={styles.value}>
        {value}
        {props.unit}
      </FontText>
    </View>
  );
};

export default CondCard;

const styles = StyleSheet.create({
  condCard: {
    width: 154,
    height: 174,
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    backgroundColor: "#F4F7FB",
    borderRadius: 22,
    shadowColor: "#3B4056",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.15,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    opacity: 0.7,
  },
  value: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    opacity: 0.4,
  },
});
