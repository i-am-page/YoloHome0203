import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import JoinForms from "./joinForms";
import JoinButtons from "./joinButtons";

import FontText from "../fontText/fontText";

const JoinContent = (props) => {

  return (
    <View style={styles.joinContent}>
      <JoinForms />
      <JoinButtons />
      <View style={{ flexDirection: "row", gap: 5 }}>
        <FontText font="HKGrotesk-Regular" style={styles.haveAccount}>Have an account?</FontText>
        <TouchableOpacity onPress={props.onLogin}>
          <FontText font="HKGrotesk-Regular" style={[styles.haveAccount, { color: "#CA1919" }]}>Log in</FontText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JoinContent;

const styles = StyleSheet.create({
  joinContent: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    position: "absolute",
    top: 128,
    width: "88%",
  },
  haveAccount: {
    height: 17,
    fontSize: 14,
    textAlign: "center",
    color: "#BDBDBD",
  },
});
