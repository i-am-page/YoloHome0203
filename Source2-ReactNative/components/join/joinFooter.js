import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

import FontText from "../fontText/fontText";

const contentWidth = Dimensions.get("window").width;
const footerWidth = contentWidth * 0.93 * 0.88;

const JoinFooter = () => {
  const [checkColor, setCheckColor] = useState("#00000040");

  const pressCheck = () => {
    if (checkColor === "#00000040") setCheckColor("#CA1919");
    else setCheckColor("#00000040");
  };

  return (
    <View style={styles.joinFooter}>
      <Pressable onPress={pressCheck}>
        <MaterialIcons name="check-circle" size={30} color={checkColor} />
      </Pressable>
      <FontText font="HKGrotesk-Medium" style={styles.agreeText}>
        I agree to receive newsletters and product updates from EleSave.
      </FontText>
    </View>
  );
};

export default JoinFooter;

const styles = StyleSheet.create({
  joinFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    position: "absolute",
    width: footerWidth,
    top: 735,
  },
  agreeText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#BDBDBD",
  },
});
