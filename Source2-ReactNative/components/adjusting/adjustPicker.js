import { useState, useContext } from "react";
import * as Font from "expo-font";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { LinearGradient } from "expo-linear-gradient";
import { AppContext } from "../../App";


const AdjustPicker = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const { devices, pickedDevice, setPickedDevice } = useContext(AppContext);

  const loadFonts = async () => {
    await Font.loadAsync({
      "SF-Pro-Display-RegularItalic": require("../../assets/fonts/sf-pro/SF-Pro-Display-RegularItalic.otf"),
    });
    setFontLoaded(true);
  };

  if (!fontLoaded) {
    loadFonts();
    return null;
  }

  const options = devices;

  const placeholder = {
    label: pickedDevice.label,
    value: pickedDevice.value,
  };

  const filteredOptions = options.filter(
    (option) => option.value !== pickedDevice.value
  );

  const getDeviceOfValue = (val) => {
    return options.find((option) => option.value === val);
  };

  return (
    <View style={styles.adjustPickerContainer}>
      <LinearGradient
        colors={["#DEE2E7", "#DBE0E7"]}
        style={{ borderRadius: 22 }}
      >
        <RNPickerSelect
          placeholder={placeholder}
          style={styles.pickerContainer}
          value={pickedDevice.value}
          onValueChange={(itemValue, ItemIndex) =>
            setPickedDevice(getDeviceOfValue(itemValue))
          }
          items={filteredOptions}
          textStyle={{ color: "#000" }}
        />
      </LinearGradient>
    </View>
  );
};

export default AdjustPicker;

const styles = StyleSheet.create({
  adjustPickerContainer: {
    // borderRadius: 22,
  },
  pickerContainer: {
    inputIOS: {
      // width: 226,
      height: 44,
      fontFamily: "SF-Pro-Display-RegularItalic",
      fontSize: 20,
      color: "#000",
      textAlign: "center",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#EFF1F5",
      borderRadius: 22,
    },
  },
});
