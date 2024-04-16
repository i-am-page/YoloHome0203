import { View, StyleSheet, Switch } from "react-native";
import MainColorText from "../mainColor/mainColorText";
import { useContext } from "react";
import { AppContext } from "../../App";

const ModeSwitch = () => {
  const { pickedDevice, setPickedDevice } = useContext(AppContext);

  let modeText = pickedDevice.isManual ? "MANUAL" : "AUTO";

  const toggleSwitch = () => {
    setPickedDevice((device) => {
      const newDevice = Object.create(device);
      newDevice.switchMode();
      return newDevice;
    });
  };

  return (
    <View style={styles.ModeSwitchContainer}>
      <MainColorText font="SF-Pro-Display-Bold" style={styles.modeText}>
        {modeText}
      </MainColorText>
      <Switch
        trackColor={{ false: "#f2e0f7", true: "#e9536a" }}
        thumbColor={pickedDevice.isManual ? "#ffdfdc" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={pickedDevice.isManual}
      />
    </View>
  );
};

export default ModeSwitch;

const styles = StyleSheet.create({
  ModeSwitchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 62,
    padding: 20,
  },
  modeText: {
    fontSize: 22,
    textAlign: "left",
  },
});
