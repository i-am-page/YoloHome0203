import { StyleSheet, TouchableOpacity, View } from "react-native";
import MainColor from "../mainColor/mainColor";
import FontText from "../fontText/fontText";

const StartButtons = (props) => {

  return (
    <View style={styles.buttons}>
      <MainColor style={{borderRadius: 16}}>
        <TouchableOpacity style={styles.joinButton} onPress={props.onStartJoin}>
          <FontText font="HKGrotesk-Bold" style={styles.joinText}>Join</FontText>
        </TouchableOpacity>
      </MainColor>
      <TouchableOpacity style={styles.loginButton} onPress={props.onStartLogin}>
        <FontText font="HKGrotesk-Bold" style={styles.loginText}>Login</FontText>
      </TouchableOpacity>
    </View>
  );
};

export default StartButtons;

const styles = StyleSheet.create({
  buttons: {
    gap: 10,
  },
  joinButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 113,
    borderRadius: 16,
  },
  joinText: {
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 113,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#8E8E8E",
    borderRadius: 16,
  },
  loginText: {
    width: 165,
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
