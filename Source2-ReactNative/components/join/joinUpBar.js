import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

import FontText from "../fontText/fontText";

const JoinUpBar = (props) => {

  return (
    <View style={styles.upBarContainer}>
      <TouchableOpacity style={styles.previousButton} onPress={props.onCancel}>
        <Image
          source={require("../../assets/joinIcon/close.png")}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      <FontText font="HKGrotesk-Bold" style={styles.title}>Join EleSave</FontText>
    </View>
  );
};

export default JoinUpBar;

const styles = StyleSheet.create({
  upBarContainer: {
    alignItems: "flex-start",
    position: "absolute",
    width: "92%",
    top: 19,
  },
  previousButton: {
    width: 32,
    height: 32,
    backgroundColor: "#EEEEEF",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    height: 12,
    width: 12,
  },
  title: {
    width: "100%",
    height: 31,
    fontSize: 24,
    textAlign: "center",
    color: "#000000",
  },
});
