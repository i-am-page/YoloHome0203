import { StyleSheet, View } from "react-native";

import TopNavBar from "../components/adjusting/topNavBar";
import BotNavBar from "../components/NavBars/botNavBar";
import AdjustContent from "../components/adjusting/adjustContent";
import { useState } from "react";

const Adjusting = () => {
  return (
    <View style={styles.adjustContainer}>
      <TopNavBar />
      <AdjustContent />
      <BotNavBar />
    </View>
  );
};

export default Adjusting;

const styles = StyleSheet.create({
  adjustContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EFF1F5",
    borderRadius: 50,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
