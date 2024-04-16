import { View, StyleSheet, Switch, TouchableOpacity } from "react-native";
import {
  MainColorEntypo,
  MainColorMaterialCommunityIcons,
} from "../mainColor/mainColorIcon";
import FontText from "../fontText/fontText";
import MainColorText from "../mainColor/mainColorText";
import { useContext, useState } from "react";
import { AppContext } from "../../App";

const DeviceCard = (props) => {
  const { setPickedDevice, setIsAdjusting } =
    useContext(AppContext);

  const [cardDevice, setCardDevice] = useState(props.device);

  let modeText = cardDevice.isManual ? "MANUAL" : "AUTO";

  const toggleSwitch = () => {
    setCardDevice((device) => {
      const newDevice = Object.create(device);
      newDevice.switchMode();
      return newDevice;
    });

  };

  const pressCard = () => {
    setPickedDevice(cardDevice);
    setIsAdjusting(true);
  };

  let icon =
    cardDevice.type === "Light" ? (
      <MainColorEntypo name="light-up" size={60} />
    ) : (
      <MainColorMaterialCommunityIcons name="fan" size={60} />
    );

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={pressCard}>
      <View style={styles.card}>
        <View style={styles.imageFrame}>{icon}</View>
        <View style={styles.titleFrame}>
          <FontText font="SF-Pro-Display-BoldItalic" style={styles.title}>
            {cardDevice.label}
          </FontText>
          <View style={styles.modeControl}>
            <MainColorText font="SF-Pro-Display-Bold" style={styles.modeText}>
              {modeText}
            </MainColorText>
            <Switch
              trackColor={{ false: "#f2e0f7", true: "#e9536a" }}
              thumbColor={cardDevice.isManual ? "#ffdfdc" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={cardDevice.isManual}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "50%",
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    overflow: "visible",
    backgroundColor: "#F4F7FB",
    height: 233,
    width: 155,
    padding: 10,
    gap: 10,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 7,
    shadowColor: "rgb(59, 64, 86)",
    shadowOpacity: 0.15,
    borderRadius: 22,
  },
  imageFrame: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  titleFrame: {
    width: "100%",
    height: 80,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    opacity: 0.6,
  },
  modeControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modeText: {
    fontSize: 16,
  },
});
