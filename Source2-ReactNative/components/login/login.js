import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

import LoginForms from "./loginForms";

import FontText from "../fontText/fontText";

const Login = (props) => {
  return (
    <Modal animationType="fade">
      <ScrollView alwaysBounceVertical={false}>
        <View style={styles.loginContainer}>
          <View style={styles.loginContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={props.onEndLogin}
            >
              <MaterialIcons name="chevron-left" size={24} color="#53575E" />
              <FontText font="HKGrotesk-Medium" style={styles.backText}>Back</FontText>
            </TouchableOpacity>
            <View style={styles.loginHeader}>
              <FontText font="HKGrotesk-Bold" style={styles.greetingText}>Welcome back!</FontText>
              <FontText font="HKGrotesk-Regular" style={styles.extraGreetingText}>
                We’re so excited to see you again!
              </FontText>
            </View>
            <LoginForms />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#EFF1F5",
  },
  loginContent: {
    alignItems: "flex-start",
    gap: 32,
    position: "absolute",
    top: 56,
    width: "88%",
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingVertical: 10,
    paddingRight: 20,
  },
  backText: {
    fontSize: 16,
    textAlign: "center",
    color: "#53575E",
  },
  loginHeader: {
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  greetingText: {
    fontSize: 26,
    lineHeight: 34,
    textAlign: "center",
  },
  extraGreetingText: {
    fontSize: 13,
    lineHeight: 17,
    textAlign: "center",
    color: "#50555F",
  },
});