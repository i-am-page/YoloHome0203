import { Pressable, StyleSheet } from "react-native";
import FontText from "../fontText/fontText";
import { useContext } from "react";
import { AppContext } from "../../App";

const SegmentButton = (props) => {
  const { selectedSegment, setSelectedSegment } = useContext(AppContext);

  const press = () => {
    if (props.value === "Light") {
      setSelectedSegment("Light");
    } else {
      setSelectedSegment("Fan");
    }
  };

  return (
    <Pressable
      style={[
        styles.segment,
        selectedSegment === props.value && { backgroundColor: "#FFF" },
      ]}
      onPress={press}
    >
      <FontText font="SF-Pro-Display-Regular" style={styles.buttonText}>
        {props.children}
      </FontText>
    </Pressable>
  );
};

export default SegmentButton;

const styles = StyleSheet.create({
  segment: {
    width: 173,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
  },
});
