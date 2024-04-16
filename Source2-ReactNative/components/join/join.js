import {
  Dimensions,
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import JoinUpBar from "./joinUpBar";
import JoinContent from "./joinContent";
import JoinFooter from "./joinFooter";
import { createContext, useContext, useState } from "react";
import User from "../../class/user";

import { createUser } from "../../utils/auth";
import { storeUser } from "../../services/httpServices";
import { WelcomeContext } from "../../screens/welcomeScreen";
import { AuthContext } from "../../store/authContext";

const windowHeight = Dimensions.get("window").height;

export const JoinContext = createContext();

const Join = (props) => {
  const [newUser, setNewUser] = useState(new User());

  const { startLogin } = useContext(WelcomeContext);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });

  const authCtx = useContext(AuthContext);

  const joinHandler = async ({ email, password }) => {
    try {
      const token = await createUser(email, password);
      console.log(2);
      authCtx.authenticate(token);
    } catch (error) {
      console.log(error)
      Alert.alert("Sign up Failed", "Check Information input again!");
    } finally {
      storeUser(newUser);

      setNewUser({
        name: "",
        email: "",
        pass: "",
      });

      Alert.alert("Done", "Sign up succesfully!");

      startLogin();
    }
  };

  const submitHandler = (credentials) => {
    let { email, password } = credentials;

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

    joinHandler({ email, password });
  };

  return (
    <JoinContext.Provider value={{ newUser, setNewUser, submitHandler }}>
      <Modal animationType="slide">
        <View style={styles.modalDropShadow}>
          <ScrollView alwaysBounceVertical={false}>
            <View style={styles.joinModal}>
              <JoinUpBar onCancel={props.onEndJoin} />
              <JoinContent onLogin={props.onLogin} />
              <JoinFooter />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </JoinContext.Provider>
  );
};

export default Join;

const styles = StyleSheet.create({
  modalDropShadow: {
    shadowColor: "#00000040",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
  },
  joinModal: {
    height: 870,
    width: "100%",
    top: windowHeight - 870,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#00000033",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: "center",
  },
});
