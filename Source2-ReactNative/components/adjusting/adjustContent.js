import { StyleSheet, View } from "react-native";

import AdjustRemote from "./adjustRemote";
import WeatherCondition from "./weatherCondition";

const AdjustContent = () => {
  return (
    <View style={styles.bodyContainer}>
      <AdjustRemote />
      <WeatherCondition />
    </View>
  );
};

export default AdjustContent;

const styles = StyleSheet.create({
  bodyContainer: {
    position: "absolute",
    justifyContent: "space-between",
    alignItems: "center",
    top: 121,
    gap: 17,
  },
});
