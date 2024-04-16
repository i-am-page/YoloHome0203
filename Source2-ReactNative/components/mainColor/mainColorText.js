import MaskedView from "@react-native-community/masked-view";
import MainColor from "./mainColor";
import FontText from "../fontText/fontText";

const MainColorText = (props) => {
  return (
    <MaskedView
      maskElement={
        <FontText
          font={props.font}
          style={[props.style, { backgroundColor: "transparent" }]}
        >
          {props.children}
        </FontText>
      }
    >
      <MainColor>
        <FontText font={props.font} style={[props.style, { opacity: 0 }]}>
          {props.children}
        </FontText>
      </MainColor>
    </MaskedView>
  );
};

export default MainColorText;
