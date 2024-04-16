import { useContext, useState } from "react";
import * as Font from "expo-font";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import MainColor from "../mainColor/mainColor";
import { AppContext } from "../../App";
import { login } from "../../utils/auth";
import { AuthContext } from "../../store/authContext";

const LoginForms = () => {
  const { setIsLogged } = useContext(AppContext);

  const [passIsVisible, setPassIsVisible] = useState(false);

  const [fontLoaded, setFontLoaded] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const authCtx = useContext(AuthContext);

  const loadFonts = async () => {
    await Font.loadAsync({
      "HKGrotesk-Medium": require("../../assets/fonts/hk-grotesk/HKGrotesk-Medium.otf"),
      "HKGrotesk-Bold": require("../../assets/fonts/hk-grotesk/HKGrotesk-Bold.otf"),
      "HKGrotesk-Regular": require("../../assets/fonts/hk-grotesk/HKGrotesk-Regular.otf"),
    });
    setFontLoaded(true);
  };
  if (!fontLoaded) {
    loadFonts();
    return null;
  }

  const togglePasswordVisibility = () => {
    setPassIsVisible(!passIsVisible);
  };

  const emailChangeHandler = (value) => {
    setEnteredEmail(value);
  };

  const passChangeHandler = (value) => {
    setEnteredPassword(value);
  };

  const loginHandler = async ({ email, password }) => {
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
      console.log(authCtx.isAuthenticated);
    } catch (error) {
      Alert.alert("Login Failed", "Check Information input again!");
    }
  };

  const submitHandler = async (credentials) => {
    let { email, password } = credentials;

    console.log(credentials);

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }

    loginHandler({ email, password });
  };
  
  if (authCtx.isAuthenticated) setIsLogged(true);

  const loginDoneHandler = () => {
    submitHandler({ email: enteredEmail, password: enteredPassword });
  };

  return (
    <View style={styles.LoginFormsContainer}>
      <Text style={styles.accInfoText}>Account Information</Text>
      <TextInput
        style={styles.loginInput}
        value={enteredEmail}
        onChangeText={emailChangeHandler}
        placeholder="Email"
      />
      <View style={styles.passInput}>
        <TextInput
          style={styles.loginInput}
          value={enteredPassword}
          onChangeText={passChangeHandler}
          secureTextEntry={!passIsVisible}
          placeholder="Password"
        />
        <Pressable onPress={togglePasswordVisibility}>
          <MaterialIcons
            name={passIsVisible ? "visibility" : "visibility-off"}
            size={24}
            color="#50555F"
          />
        </Pressable>
      </View>
      <Text style={styles.forgotPass}>Forgot your password?</Text>
      <MainColor style={{ borderRadius: 20, width: "100%" }}>
        <TouchableOpacity style={styles.loginBtn} onPress={loginDoneHandler}>
          <Text style={styles.LoginText}>Login</Text>
        </TouchableOpacity>
      </MainColor>
    </View>
  );
};

export default LoginForms;

const styles = StyleSheet.create({
  LoginFormsContainer: {
    alignItems: "flex-start",
    gap: 13,
    width: "100%",
  },
  accInfoText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 12,
    lineHeight: 16,
    textTransform: "uppercase",
    color: "#50555F",
  },
  loginInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 32,
    gap: 10,
    backgroundColor: "#E3E5E8",
    borderRadius: 4,
    fontFamily: "HKGrotesk-Medium",
    fontSize: 16,
    lineHeight: 21,
    color: "#767E8B",
  },
  passInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 35,
    backgroundColor: "#E3E5E8",
    borderRadius: 4,
  },
  forgotPass: {
    fontFamily: "HKGrotesk-Medium",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    color: "#CA1919",
  },
  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 113,
    paddingVertical: 18,
    alignSelf: "stretch",
    width: "100%",
    borderRadius: 20,
  },
  LoginText: {
    fontFamily: "HKGrotesk-Bold",
    fontSize: 13,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
