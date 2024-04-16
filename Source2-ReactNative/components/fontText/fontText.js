import { useState } from "react";
import * as Font from "expo-font";
import { Text } from "react-native";

const FontText = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      "SF-Pro-Display-Regular": require("../../assets/fonts/sf-pro/SF-Pro-Display-Regular.otf"),
      "SF-Pro-Display-RegularItalic": require("../../assets/fonts/sf-pro/SF-Pro-Display-RegularItalic.otf"),
      "SF-Pro-Display-Bold": require("../../assets/fonts/sf-pro/SF-Pro-Display-Bold.otf"),
      "SF-Pro-Display-BoldItalic": require("../../assets/fonts/sf-pro/SF-Pro-Display-BoldItalic.otf"),
      "SF-Pro-Display-ThinItalic": require("../../assets/fonts/sf-pro/SF-Pro-Display-ThinItalic.otf"),
      "SF-Pro-Display-Medium": require("../../assets/fonts/sf-pro/SF-Pro-Display-Medium.otf"),
      "HKGrotesk-Bold": require("../../assets/fonts/hk-grotesk/HKGrotesk-Bold.otf"),
      "HKGrotesk-Regular": require("../../assets/fonts/hk-grotesk/HKGrotesk-Regular.otf"),
      "HKGrotesk-Medium": require("../../assets/fonts/hk-grotesk/HKGrotesk-Medium.otf"),
    });
    setFontLoaded(true);
  };

  if (!fontLoaded) {
    loadFonts();
    return null;
  }

  return (
    <Text style={[props.style, { fontFamily: props.font }]}>
      {props.children}
    </Text>
  );
};

export default FontText;
