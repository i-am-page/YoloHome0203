import { View, StyleSheet } from "react-native";

const SideButton = ({ children }) => {
  return (
    <View style={styles.sideButton}>
      <View style={styles.colorBox1}></View>
      <View style={styles.colorBox2}></View>
      <View style={styles.whiteBox}></View>
      <View style={styles.children}>{children}</View>
    </View>
  );
};

export default SideButton;

const styles = StyleSheet.create({
  sideButton: {
    height: 88,
    width: 174,
  },
  colorBox1: {
    backgroundColor: "#535572",
    position: "absolute",
    left: 0,
    height: "100%",
    width: "66%",
    borderTopRightRadius: "80%",
    overflow: "hidden",
  },
  colorBox2: {
    backgroundColor: "#535572",
    height: "50%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  whiteBox: {
    backgroundColor: "#EFF1F5",
    position: "absolute",
    right: 0,
    bottom: 0,
    height: "100%",
    width: "43%",
    borderBottomLeftRadius: "100%",
    overflow: "hidden",
  },
  children: {
    position: 'absolute',
    top: '23.45%',
    left: '16.45%',
  }
});
