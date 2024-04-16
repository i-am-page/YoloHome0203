import { Dimensions, StyleSheet, View, TextInput } from "react-native";
import { useContext, useState } from "react";
import * as Font from "expo-font";
import { JoinContext } from "./join";

const contentWidth = Dimensions.get("window").width;
const formWidth = contentWidth * 0.93 * 0.88;

const JoinForms = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const { newUser, setNewUser } = useContext(JoinContext);

  const loadFonts = async () => {
    await Font.loadAsync({
      "HKGrotesk-Regular": require("../../assets/fonts/hk-grotesk/HKGrotesk-Regular.otf"),
    });
    setFontLoaded(true);
  };

  if (!fontLoaded) {
    loadFonts();
    return null;
  }

  const nameChangeHandler = (name) => {
    const updatedNewUser = { ...newUser, name: name };
    setNewUser(updatedNewUser);
  };

  const emailChangeHandler = (email) => {
    const updatedNewUser = { ...newUser, email: email };
    setNewUser(updatedNewUser);
  };

  const passChangeHandler = (pass) => {
    const updatedNewUser = { ...newUser, pass: pass };
    setNewUser(updatedNewUser);
  };

  return (
    <View style={styles.joinForms}>
      <TextInput
        style={styles.joinInput}
        value={newUser.name}
        onChangeText={nameChangeHandler}
        placeholder="Name"
      />
      <TextInput
        style={styles.joinInput}
        value={newUser.email}
        onChangeText={emailChangeHandler}
        placeholder="Email Address"
      />
      <TextInput
        style={styles.joinInput}
        value={newUser.pass}
        onChangeText={passChangeHandler}
        secureTextEntry={true}
        placeholder="Password"
      />
    </View>
  );
};

export default JoinForms;

const styles = StyleSheet.create({
  joinForms: {
    alignItems: "flex-start",
    gap: 12,
    width: formWidth,
  },
  joinInput: {
    alignItems: "flex-start",
    width: "100%",
    height: 31,
    borderBottomColor: "#F1F1F1",
    borderBottomWidth: 1,
    borderStyle: "solid",
    alignSelf: "stretch",
    fontFamily: "HKGrotesk-Regular",
    fontSize: 16,
  },
});
