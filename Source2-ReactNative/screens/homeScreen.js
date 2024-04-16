import { View, StyleSheet } from "react-native";

import BotNavBar from "../components/NavBars/botNavBar";
import SettingBtn from "../components/NavBars/settingBtn";
import HomeItems from "../components/home/homeItems";
import FontText from "../components/fontText/fontText";

const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.homePage}>
        <View style={styles.topNav}>
          <View style={styles.topLeftNav}>
            <FontText font="SF-Pro-Display-Bold" style={styles.homeText}>
              Home
            </FontText>
          </View>
          <SettingBtn />
        </View>
        <HomeItems />
      </View>
      <BotNavBar />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "#EFF1F5",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  homePage: {
    width: "100%",
    // height: '100%',
    position: "absolute",
    top: 0,
    gap: 28,
    alignItems: "center",
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    position: "absolute",
    alignSelf: "stretch",
    width: "100%",
    top: 49,
  },
  topLeftNav: {
    position: "absolute",
    left: 0,
    alignItems: "center",
    paddingLeft: 30,
  },
  homeText: {
    fontSize: 32,
  },
  topRightNav: {
    borderWidth: 1,
  },
});
