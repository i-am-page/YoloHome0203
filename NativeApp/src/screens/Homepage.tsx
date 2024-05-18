import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { apiFacade } from "./apiFacade";
import { StackNavigationProp } from "@react-navigation/stack";
import Slider from "@react-native-community/slider";
import { Notifications } from "react-native-notifications";
import Voice from "@react-native-voice/voice";

type RootStackParamList = {
  Dashboard: undefined;
  SignIn: undefined;
  Graphs: undefined;
  // Add other screens here
};
type State = {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: boolean;
  results: string[];
  partialResults: string[];
};
type Props = {
  onSpeechStart: () => void;
  onSpeechEnd: (result: any[]) => void;
};
type NavigationProp = StackNavigationProp<RootStackParamList, "Dashboard">;
export const Homepage = (account: any, props: Props, state: State) => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState(null);
  const [muted, setMuted] = useState(true);
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  // const nickname = account.route.params.nickname;
  const refresh = async () => {
    try {
      const data = await apiFacade.getRecord();
      // console.log(data); 
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const switchLight = async (val: any) => {
    const res = await apiFacade.switchLight(val);
    setData(res);
  };
  const switchFan = async (val: any) => {
    const res = await apiFacade.switchFan(val);
    setData(res);
  };

  useEffect(() => {
    refresh();
    const intervalId = setInterval(refresh, 60000);
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      Voice.destroy().then(Voice.removeAllListeners); 
    };
  }, []);
  
  const dateTime = new Date((data as any)?.time);
  var date = ``;
  if ((dateTime.getMonth()+1)>10) {
    if ((dateTime.getDate()>=10)) {
        date = `${dateTime.getDate()}/${
        dateTime.getMonth() + 1
      }/${dateTime.getFullYear()}`;
    } else {
      date = `0${dateTime.getDate()}/${
        dateTime.getMonth() + 1
      }/${dateTime.getFullYear()}`;
    }
  } else {
    if ((dateTime.getDate() >= 10)) {
      date = `${dateTime.getDate()}/0${
        dateTime.getMonth() + 1
      }/${dateTime.getFullYear()}`;
    } else {
      date = `0${dateTime.getDate()}/0${
        dateTime.getMonth() + 1
      }/${dateTime.getFullYear()}`;
    }
  }
  var time = ``;
  const hour = (dateTime.getHours() + 17 < 24) ? (dateTime.getHours() + 17) : (dateTime.getHours() - 7)
  if (hour >= 10) {
    if (dateTime.getMinutes() >= 10) {
      if (dateTime.getSeconds() >= 10) {
        time = `${hour}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
      }
      else {
        time = `${hour}:${dateTime.getMinutes()}:0${dateTime.getSeconds()}`
      }
    } else {
      if (dateTime.getSeconds() >= 10) {
        time = `${hour}:0${dateTime.getMinutes()}:${dateTime.getSeconds()}`
      }
      else {
        time = `${hour}:0${dateTime.getMinutes()}:0${dateTime.getSeconds()}`
      }
    }
  } else {
    if (dateTime.getMinutes() >= 10) {
      if (dateTime.getSeconds() >= 10) {
        time = `0${hour}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`
      }
      else {
        time = `0${hour}:${dateTime.getMinutes()}:0${dateTime.getSeconds()}`
      }
    } else {
      if (dateTime.getSeconds() >= 10) {
        time = `0${hour}:0${dateTime.getMinutes()}:${dateTime.getSeconds()}`
      }
      else {
        time = `0${hour}:0${dateTime.getMinutes()}:0${dateTime.getSeconds()}`
      }
    }
  }

  //Voice Handler
  const speechStartHandler = e => {
    console.log('speechStart successful', "\nError:",e);
  };
  
  const speechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', "\nError:", e);
  };
  
  const speechResultsHandler = async(e) => {
    const text = e.value[0];
    setResult(text)
    if (e.value[0] == "turn on the light") {
      switchLight(1);
      refresh();
    } else if (e.value[0] == "turn off the light") {
      switchLight(0);
      refresh();
    } else if (e.value[0] == "turn on the fan") {
      switchFan(100);
      refresh();
    } else if (e.value[0] == "turn off the fan") {
      switchFan(0);
      refresh();
    }
    console.log("Result Speech: ",e.value[0])
  };

  const handlePressIn = async () => {
    setMuted(!muted);
    setLoading(true);
    if (Voice) {
      try {
        await Voice.start('en-Us');
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      console.log("Cannot Unmute")
    }
  };

  const handlePressOut = async () => {
    setMuted(true);
    if (Voice) {
      try {
        await Voice.stop();
        setLoading(false);
      } catch (error) {
        console.log('Error: ', error);
      }
    } else {
      console.log("Muting Error")
    }
  };

  const clear = () => {
    setResult('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, { marginTop: 20, paddingVertical: 10 }]}>
        <Image
          source={require("../../assets/images/homeicon.png")}
          style={[{ width: 60, height: 60 }]}
        />
        <Text
          style={{
            color: "black",
            fontSize: 24,
            height: 40,
            fontWeight: "bold",
          }}
        >
          YoloHome
        </Text>
      </View>
      <View>
        <TouchableOpacity style={[styles.row, {marginTop:30}]}>
          <Text style={[{fontStyle:"italic"}]}>
            Cập nhật cuối: {date} lúc {time}
          </Text>
          <TouchableOpacity onPress={refresh}>
            <Image
              source={require("../../assets/images/reload.gif")}
              style={[{ width: 30, height: 30, marginLeft:10}]}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={[styles.table, {backgroundColor:'#ffcaa1'}]}>
        <View style={[styles.row, styles.cell, {backgroundColor:'#ffcaa1'}]}>
          <View style={styles.row}>
            <Text style={styles.sub}>Nhiệt độ</Text>
            <Image
              source={require("../../assets/images/temper.png")}
              style={[{ marginLeft: -17, width: 30, height: 30 }]}
            />
          </View>
          <Text style={[styles.main, {fontStyle:"italic", fontSize:15}]}>
            {(data as any) ? (data as any).temp + "°C" : "Loading"}
          </Text>
        </View>
      </View>
      <View style={[styles.table, { marginTop: 20, backgroundColor: '#a1d4ff' }]}>
        <View style={[styles.row, styles.cell , {backgroundColor: '#a1d4ff'}]}>
          <View style={styles.row}>
            <Text style={styles.sub}>Độ ẩm</Text>
            <Image
              source={require("../../assets/images/humid.png")}
              style={[{ marginLeft: -17, width: 30, height: 30 }]}
            />
          </View>
          <Text style={[styles.main, {fontStyle:"italic", fontSize:15}]}>
            {(data as any) ? (data as any).humidity + "%" : "Loading"}
          </Text>
        </View>
      </View>
      <View style={[styles.table, { marginTop: 20, backgroundColor: '#ffffcc' }]}>
        <View style={[styles.row, styles.cell, {backgroundColor: '#ffffcc'}]}>
          <View style={styles.row}>
            <Text style={styles.sub}>Độ sáng</Text>
            <Image
              source={require("../../assets/images/luminous.png")}
              style={[{ marginLeft: -17, width: 30, height: 30 }]}
            />
          </View>
          <Text style={[styles.main, {fontStyle:"italic", fontSize:15}]}>
            {(data as any) ? (data as any).lightvalue + " lux" : "Loading"}
          </Text>
        </View>
      </View>
      <View style={[{
        marginTop: 40,
        alignSelf:'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        borderColor: "black",
        borderStyle: 'solid',
        borderWidth: 1,
      }]}>
        <View style={[{
              marginBottom: 20,
              height: 40,
              width: '50%',
            }, styles.row]}>
          <Text style={{color: "black", fontSize: 18, fontStyle: "italic", marginLeft: 10}}>
            Điều khiển thiết bị
          </Text>
          <Image
                source={require("../../assets/images/flipswitch.png")}
                style={[{ width: 50, height: 20, marginLeft: 10, aspectRatio: 2, marginTop:2 }]}
              />
        </View>
        <View style={[styles.routineTable, {marginRight:115, backgroundColor: "transparent"}]}>
          <View style={[styles.rowns, { marginBottom: 10, backgroundColor: "transparent" }]}>
            <View style={[styles.rowns, { marginRight: 40 }]}>
              <Text style={[styles.text, {marginRight:8}]}>Đèn</Text>
              <Image
                source={require("../../assets/images/bulb.png")}
                style={[{ marginLeft: 3, width: 40, height: 40 }]}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.routineCell,
                {
                  backgroundColor:
                    (data as any) && (data as any).light == 0
                      ? "#ff9900" //Tắt đèn
                      : "#ffd000",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                },
              ]}
              onPress={() => {
                switchLight(0);
              }}
            >
              <Text> {(data as any) ? "Tắt" : "N/A"} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.routineCell,
                {
                  backgroundColor:
                    (data as any) && (data as any).light > 0
                      ? "#ff9900" //Bật đèn
                      : "#ffd000",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                },
              ]}
              onPress={() => {
                switchLight(1);
              }}
            >
              <Text> {(data as any) ? "Bật" : "N/A"} </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.rowns, { marginBottom: 10, backgroundColor: "transparent" }]}>
            <View style={[styles.rowns, { marginRight: 40, backgroundColor: "transparent" }]}>
              <Text style={styles.text}>Quạt</Text>
              <Image
                source={require("../../assets/images/speen.png")}
                style={[{ marginLeft: 3, width: 40, height: 40 }]}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.routineCell,
                {
                  backgroundColor:
                    (data as any) && (data as any).fan == 0
                      ? "#ff9900" //Tắt quạt
                      : "#ffd000",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                },
              ]}
              onPress={() => {
                switchFan(0);
              }}
            >
              <Text> {(data as any) ? "Tắt" : "N/A"} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.routineCell,
                {
                  backgroundColor:
                    (data as any) && (data as any).fan > 0
                      ? "#ff9900" //Bật quạt
                      : "#ffd000",
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                },
              ]}
              onPress={() => {
                switchFan(100);
              }}
            >
              <Text> {(data as any) ? "Bật" : "N/A"} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          left: 115,
          right: 0,
          bottom: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: 200,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#03fc5a",
            padding: 13,
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 10,
            marginRight:60,
          }}
          onPress={() => {
            navigation.navigate("Dashboard", account.route.params);
          }}
        >
          <Text style={{fontWeight:'bold', fontStyle:'italic'}}>DBoard</Text>
        </TouchableOpacity>
        {muted &&
        <TouchableOpacity onPress={() => handlePressIn()}>
          <Image
              source={require("../../assets/images/MicMute.png")}
              style={[{ marginLeft: 0, width: 50, height: 50 }]}
            />
        </TouchableOpacity>
        }
        {!muted && 
        <TouchableOpacity onPress={() => handlePressOut()}>
          <Image
              source={require("../../assets/images/Mic.png")}
              style={[{ marginLeft: 0, width: 50, height: 50 }]}
            />
        </TouchableOpacity>
        }
        <TouchableOpacity
          style={{
            backgroundColor: "#6effa0",
            padding: 13,
            borderWidth: 1,
            borderColor: "#000",
            borderRadius:10,
            marginLeft:60,
          }}
          onPress={() => {
            navigation.navigate("Graphs", account.route.params);
          }}
        >
          <Text style={{fontStyle:'italic'}}>Graphs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#78f4ff",
    //justifyContent: 'center',
  },
  table: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 20,
    padding: 5,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowns: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-between',
  },
  cell: {
    width: 300,
    height: 50,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  main: {
    marginRight: 20,
  },
  sub: {
    width: 100,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  roomtable: {},
  roomrow: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  roomcell: {
    borderWidth: 1,
    borderColor: "#000",
    margin: 10,
    width: 140,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FFE0BC",
  },
  routineTable: {
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  routineCell: {
    borderWidth: 1,
    borderColor: "#000",
    width: 45,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#FFE0BC",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
});
