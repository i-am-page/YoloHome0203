import { AntDesign, Entypo, MaterialCommunityIcons } from "react-native-vector-icons";
import MaskedView from "@react-native-community/masked-view";
import MainColor from "./mainColor";

const MainColorAntDesign = (props) => {
  return (
    <MaskedView
      maskElement={
        <AntDesign
          name={props.name}
          size={props.size}
          style={{ backgroundColor: "transparent" }}
        />
      }
    >
      <MainColor>
        <AntDesign name={props.name} size={props.size} style={{ opacity: 0 }} />
      </MainColor>
    </MaskedView>
  );
};

const MainColorEntypo = (props) => {
  return (
    <MaskedView
      maskElement={
        <Entypo
          name={props.name}
          size={props.size}
          style={{ backgroundColor: "transparent" }}
        />
      }
    >
      <MainColor>
        <Entypo name={props.name} size={props.size} style={{ opacity: 0 }} />
      </MainColor>
    </MaskedView>
  );
};

const MainColorMaterialCommunityIcons = (props) => {
  return (
    <MaskedView
      maskElement={
        <MaterialCommunityIcons
          name={props.name}
          size={props.size}
          style={{ backgroundColor: "transparent" }}
        />
      }
    >
      <MainColor>
        <MaterialCommunityIcons name={props.name} size={props.size} style={{ opacity: 0 }} />
      </MainColor>
    </MaskedView>
  );
};

export { MainColorAntDesign, MainColorEntypo, MainColorMaterialCommunityIcons };
