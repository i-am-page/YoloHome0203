import { StyleSheet, View } from "react-native";
import MainColorText from "../mainColor/mainColorText";
import FontText from "../fontText/fontText";

const WelcomeHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <MainColorText font="HKGrotesk-Bold" style={styles.title}>
        EleSave
      </MainColorText>
      <FontText font="HKGrotesk-Medium" style={styles.slogan}>
        Upload in the highest quality
      </FontText>
    </View>
  );
};

export default WelcomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: 256,
    height: 128,
    position: "absolute",
    top: 116,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    textAlign: "center",
    backgroundColor: "transparent",
  },
  slogan: {
    width: 257,
    height: 84,
    fontSize: 32,
    lineHeight: 42,
    textAlign: "center",
    color: "#000000",
    flex: 0,
    flexGrow: 1,
  },
});
