import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import MainColor from "../mainColor/mainColor";
import FontText from "../fontText/fontText";

import { useContext } from "react";
import { JoinContext } from "./join";

const contentWidth = Dimensions.get("window").width;
const buttonsWidth = contentWidth * 0.93 * 0.88;

const JoinButtons = () => {
  const { newUser, submitHandler } = useContext(JoinContext);

  const joinHandler = () => {
    submitHandler({ email: newUser.email, password: newUser.pass });
  };

  return (
    <View style={styles.joinButtons}>
      <MainColor style={{ borderRadius: 16 }}>
        <TouchableOpacity style={styles.joinMember} onPress={joinHandler}>
          <FontText font="HKGrotesk-Bold" style={styles.joinMemberText}>
            Join
          </FontText>
        </TouchableOpacity>
      </MainColor>
      <FontText font="HKGrotesk-Regular" style={styles.ORText}>
        OR
      </FontText>
      <TouchableOpacity style={styles.joinMedia}>
        <Image
          source={require("../../assets/joinIcon/apple-logo.png")}
          style={styles.joinIcon}
        />
        <FontText font="HKGrotesk-Bold" style={styles.joinMediaText}>
          Continue with Apple
        </FontText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.joinMedia}>
        <Image
          source={require("../../assets/joinIcon/google.png")}
          style={styles.joinIcon}
        />
        <FontText font="HKGrotesk-Bold" style={styles.joinMediaText}>
          Continue with Google
        </FontText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.joinMedia}>
        <Image
          source={require("../../assets/joinIcon/facebook.png")}
          style={styles.joinIcon}
        />
        <FontText font="HKGrotesk-Bold" style={styles.joinMediaText}>
          Continue with Facebook
        </FontText>
      </TouchableOpacity>
    </View>
  );
};

export default JoinButtons;

const styles = StyleSheet.create({
  joinButtons: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    width: buttonsWidth,
  },
  joinMember: {
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 18,
    width: buttonsWidth,
    borderRadius: 16,
  },
  joinMemberText: {
    height: 19,
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
  ORText: {
    height: 14,
    fontSize: 12,
    textAlign: "center",
    color: "#000000",
  },
  joinMedia: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    width: buttonsWidth,
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E4E8E9",
    borderRadius: 32,
  },
  joinIcon: {
    width: 16,
    height: 16,
  },
  joinMediaText: {
    height: 19,
    fontSize: 16,
    textAlign: "center",
    color: "#000000",
  },
});
