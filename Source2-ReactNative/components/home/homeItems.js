import { View, StyleSheet } from "react-native";
import WeatherWidget from "./weatherWidget";
import DevicesList from "./devicesList";

const HomeItems = () => {
  return (
    <View style={styles.homeItemsContainer}>
      <WeatherWidget />
      <DevicesList />
    </View>
  );
};

export default HomeItems;

const styles = StyleSheet.create({
  homeItemsContainer: {
    width: 351,
    top: 116,
    gap: 28,
    overflow: "visible",
    alignItems: "center",
  },
});
