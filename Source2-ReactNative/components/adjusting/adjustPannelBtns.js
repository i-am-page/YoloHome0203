import { View, StyleSheet } from "react-native";
import AdjustPannelBtn from "./adjustPannelBtn";

const AdjustPannelBtns = (props) => {
  return (
    <View>
      <View style={styles.btnContainer}>
        <AdjustPannelBtn
          isManual={props.isManual}
          icon="upcircleo"
          onPressIn={props.onUpPressIn}
          onPressOut={props.onPressOut}
        />
      </View>
      <View style={styles.btnContainer}>
        <AdjustPannelBtn
          icon="closecircleo"
          isManual={props.isManual}
          onPress={props.onClosePress}
        />
      </View>
      <View style={styles.btnContainer}>
        <AdjustPannelBtn
          icon="downcircleo"
          isManual={props.isManual}
          onPressIn={props.onDownPressIn}
          onPressOut={props.onPressOut}
        />
      </View>
    </View>
  );
};

export default AdjustPannelBtns;

const styles = StyleSheet.create({
  btnContainer: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
