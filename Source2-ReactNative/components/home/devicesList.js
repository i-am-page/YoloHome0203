import { useEffect, useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import SegmentButton from "./segmentButton";
import DeviceCard from "./deviceCard";
import { AppContext } from "../../App";

const DevicesList = () => {
  const { devices, selectedSegment } = useContext(AppContext);

  useEffect(() => {
    console.log(selectedSegment);
  }, [selectedSegment]);

  const renderItem = ({ item }) => {
    if (item.type === selectedSegment) return <DeviceCard device={item} />;
  };

  return (
    <View style={styles.devicesListContainer}>
      <View style={styles.segmentedControls}>
        <SegmentButton value="Light">Lights</SegmentButton>
        <SegmentButton value="Fan">Fans</SegmentButton>
      </View>
      <FlatList
        data={devices}
        renderItem={renderItem}
        numColumns={2}
        horizontal={false}
        contentContainerStyle={styles.Cards}
      />
    </View>
  );
};

export default DevicesList;

const styles = StyleSheet.create({
  devicesListContainer: {
    overflow: "visible",
    height: "100%",
    alignItems: "center",
  },
  segmentedControls: {
    backgroundColor: "#B1BAC5",
    height: 35,
    flexDirection: "row",
    gap: 1,
    padding: 2,
    borderRadius: 10,
  },
  Cards: {
    paddingTop: 28,
    width: "100%",
    backgroundColor: "transparent",
    overflow: "visible",
    // borderWidth: 1,
  },
});
