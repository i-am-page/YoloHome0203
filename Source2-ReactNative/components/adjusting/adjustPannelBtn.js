import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MainColorAntDesign } from "../mainColor/mainColorIcon";

let outer1Colors = ["#F5F5F9", "#DADFE7"];
let outer2Colors = ["#FFFFFF", "#DADFE7"];
let innerColors = ["#DADFE7", "#F5F5F9"];

let outerRadius = 70;
let innerRadius = 60;

const AdjustPannelBtn = (props) => {
  let buttonIcon = props.isManual ? (
    <MainColorAntDesign name={props.icon} size={30} />
  ) : (
    <AntDesign name={props.icon} size={30} color="#f2e0f7" />
  );

  return (
    <TouchableOpacity
      disabled={!props.isManual}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      onPress={props.onPress}
    >
      <LinearGradient colors={outer1Colors} style={styles.outlineCircle1}>
        <LinearGradient colors={outer2Colors} style={styles.outlineCircle2}>
          <LinearGradient colors={innerColors} style={styles.innerCircle}>
            {buttonIcon}
          </LinearGradient>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AdjustPannelBtn;

const styles = StyleSheet.create({
  outlineCircle1: {
    width: outerRadius,
    height: outerRadius,
    borderRadius: outerRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  outlineCircle2: {
    width: outerRadius,
    height: outerRadius,
    borderRadius: outerRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: innerRadius,
    height: innerRadius,
    borderRadius: innerRadius,
    justifyContent: "center",
    alignItems: "center",
  },
});
