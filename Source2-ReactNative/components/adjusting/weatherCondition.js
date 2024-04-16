import { StyleSheet, View } from "react-native";
import CondCard from "./condCard";

const WeatherCondition = () => {
  return (
    <View style={styles.weatherCondition}>
      <CondCard
        icon="water-percent"
        title="Inside Humidity"
        feedKey="do-am"
        unit="%"
      />
      <CondCard
        icon="temperature-celsius"
        title="Outside Temps."
        feedKey="nhiet-do"
        unit="°C"
      />
    </View>
  );
};

export default WeatherCondition;

const styles = StyleSheet.create({
  weatherCondition: {
    flexDirection: "row",
    gap: 20,
  },
});
