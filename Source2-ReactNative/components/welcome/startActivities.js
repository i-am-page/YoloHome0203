import { StyleSheet, View, Text } from "react-native";

import StartButtons from "./startButtons";

import FontText from "../fontText/fontText";

const StartActivities = (props) => {

  return (
    <View style={styles.actContainer}>
      <StartButtons
        onStartJoin={props.onStartJoin}
        onStartLogin={props.onStartLogin}
      />
      <FontText font="HKGrotesk-Medium" style={styles.termsText}>
        By joining EleSave, you agreed to our{" "}
        <Text style={{ color: "#CA1919" }}>Terms of service</Text> and{" "}
        <Text style={{ color: "#CA1919" }}>Privacy policy</Text>
      </FontText>
    </View>
  );
};

export default StartActivities;

const styles = StyleSheet.create({
  actContainer: {
    position: "absolute",
    gap: 24,
    top: 628,
    alignItems: "center",
    justifyContent: "space-between",
  },
  termsText: {
    width: 300,
    fontSize: 12,
    textAlign: "center",
    color: "#000000",
  },
});
