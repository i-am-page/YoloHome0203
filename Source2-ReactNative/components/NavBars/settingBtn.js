import { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import FontText from "../fontText/fontText";
import { AuthContext } from "../../store/authContext";
import { AppContext } from "../../App";

const SettingBtn = () => {
  const authCtx = useContext(AuthContext);

  const { setIsLogged } = useContext(AppContext);

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const pressSetting = () => {
    setModalIsVisible((value) => !value);
    console.log(modalIsVisible);
  };

  const pressLogOut = () => {
    authCtx.logout();
    console.log(authCtx.isAuthenticated);
  };
  
  if (!authCtx.isAuthenticated) setIsLogged(false);
  
  return (
    <View style={styles.settingBtn}>
      <TouchableOpacity onPress={pressSetting}>
        <View style={[styles.btnFrame, styles.settingShadow]}>
          <AntDesign name="setting" size={20} color="#000" />
        </View>
      </TouchableOpacity>
      {modalIsVisible && (
        <TouchableOpacity
          onPress={pressLogOut}
          style={[styles.btnFrame, styles.settingOptions]}
        >
          <FontText
            font="SF-Pro-Display-RegularItalic"
            style={styles.settingOptionText}
          >
            Log Out
          </FontText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SettingBtn;

const styles = StyleSheet.create({
  settingBtn: {
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 9,
    opacity: 0.8,
  },
  btnFrame: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#DBE0E7",
  },
  settingShadow: {
    shadowColor: "#3b4056",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  settingOptions: {
    width: 100,
    position: "absolute",
    // top: 40,
    right: 55,
    overflow: "hidden",
  },
  settingOptionText: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
