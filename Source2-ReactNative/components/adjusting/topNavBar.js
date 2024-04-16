import { TouchableOpacity, StyleSheet, View } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import SettingBtn from "../NavBars/settingBtn";
import FontText from "../fontText/fontText";
import { useContext } from "react";
import { AppContext } from "../../App";

const TopNavBar = (props) => {
  const { pickedDevice, setIsAdjusting } = useContext(AppContext);

  const homePress = () => {
    setIsAdjusting(false);
  };

  return (
    <View style={styles.topNavBar}>
      <TouchableOpacity style={styles.leftNav} onPress={homePress}>
        <AntDesign name="left" size={16} color="#53575E" />
        <FontText font="SF-Pro-Display-ThinItalic" style={styles.leftNavText}>
          Home
        </FontText>
      </TouchableOpacity>
      <View style={styles.titleNav}>
        <FontText font="SF-Pro-Display-Medium" style={styles.titleNavText}>
          {pickedDevice.type} Adjusting
        </FontText>
      </View>
      <SettingBtn />
    </View>
  );
};

export default TopNavBar;

const styles = StyleSheet.create({
  topNavBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    width: "100%",
    position: "absolute",
    top: 49,
  },
  leftNav: {
    position: "absolute",
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    paddingLeft: 15,
    paddingRight: 9,
    gap: 5,
  },
  leftNavText: {
    fontSize: 20,
    color: "#000",
  },
  titleNav: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleNavText: {
    fontSize: 20,
    color: "#000",
  },
});
