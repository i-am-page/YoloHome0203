import { View, StyleSheet } from "react-native";
import SideButton from "./sideButton";

import { AntDesign } from "react-native-vector-icons";

const BotNavBar = () => {
  return (
    <View style={styles.BotNavBar}>
      <View style={styles.sideButtonsContainer}>
        <SideButton>
          <AntDesign name="home" size={30} color="#FFF" />
        </SideButton>
        <View style={styles.flipButton}>
          <SideButton>
            <AntDesign name="user" size={30} color="#FFF" />
          </SideButton>
        </View>
      </View>
    </View>
  );
};

export default BotNavBar;

const styles = StyleSheet.create({
  BotNavBar: {
    justifyContent: "flex-end",
    width: "100%",
  },
  sideButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "255, 255, 255, 0.01",
  },
  flipButton: {
    transform: [{ scaleX: -1 }],
  },
});
