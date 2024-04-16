import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

const MainColor = (props) => {
  const colors = ["#985EE1", "#F25656"];

  return (
    <LinearGradient
      colors={colors}
      start={{ x: -0.01, y: 10 }}
      end={{ x: 0.9, y: -5 }}
      locations={[0.05, 0.99]}
      style={props.style}
    >
      {props.children}
    </LinearGradient>
  );
};

export default MainColor;

