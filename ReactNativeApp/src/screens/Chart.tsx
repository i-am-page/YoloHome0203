
import { Dimensions, StyleSheet, View, Button, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { apiFacade } from './apiFacade';
import { StackNavigationProp } from '@react-navigation/stack';
import { LineChart } from 'react-native-chart-kit';

type RootStackParamList = {
  Dashboard: undefined;
  SignIn: undefined;
  Graphs: undefined;
  // Add other screens here
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Graphs'>;
export const Chart = (account: any) => {
  const navigation = useNavigation<NavigationProp>();
  const [humidata, sethumiData] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  });
  const [tempdata, settempData] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  });
  const [luxdata, setluxData] = useState({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const { labels, datasets } = await apiFacade.getChartData();
        sethumiData({
          labels: labels,
          datasets: [
            {
              data: datasets[1].data,
              color: (opacity = 1) => `rgba(0, 21, 255, ${opacity})`, // optional
              strokeWidth: 2,
            },
            {
              data: labels.map(() => 100), // invisible dataset,
              color: () => 'rgba(0, 0, 0, 0)', // invisible color
              strokeWidth: 0,
            },
            {
              data: labels.map(() => 0), // invisible dataset,
              color: () => 'rgba(0, 0, 0, 0)', // invisible color
              strokeWidth: 0,
            },
          ],
        });
        settempData({
          labels: labels,
          datasets: [
            {
              data: datasets[0].data,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
              strokeWidth: 2,
            },
            {
              data: labels.map(() => 40), // invisible dataset,
              color: () => 'rgba(0, 0, 0, 0)', // invisible color
              strokeWidth: 0,
            },
            {
              data: labels.map(() => 20), // invisible dataset,
              color: () => 'rgba(0, 0, 0, 0)', // invisible color
              strokeWidth: 0,
            },
          ],
        });
        setluxData({
          labels: labels,
          datasets: [
            {
              data: datasets[2].data,
              color: (opacity = 1) => `rgba(255, 85, 0, ${opacity})`, // optional
              strokeWidth: 2,
            },
            {
              data: labels.map(() => 90), // invisible dataset,
              color: () => 'rgba(0, 0, 0, 0)', // invisible color
              strokeWidth: 0,
            },
            {
              data: labels.map(() => 10), // invisible dataset,
              color: () => 'rgba(0, 0, 0, 0)', // invisible color
              strokeWidth: 0,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    const interval = setInterval(() => {
      getData();
    }
      , 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.row]}>
          <Text style={{ marginLeft: 110, fontSize: 19, textAlign: 'center', fontWeight:"bold", marginTop: 10, fontStyle:'italic' }}>Biểu đồ độ ẩm</Text>
          <Image
              source={require("../../assets/images/humid.png")}
              style={[{ marginTop: 10, marginRight: 95, width: 30, height: 30 }]}
            />
        </View>
        <LineChart
          data={humidata}
          width={Dimensions.get('window').width*0.9} // from react-native
          height={180}
          yAxisLabel={''}
          yAxisSuffix={'%'}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#52cdff',
            backgroundGradientTo: '#3bc7ff',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 21, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 21, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: 'rgba(0,0,0,0)',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View>
        <View style={[styles.row]}>
          <Text style={{ marginLeft: 100, fontSize: 19, textAlign: 'center', fontWeight:"bold", fontStyle:'italic' }}>Biểu đồ nhiệt độ</Text>
          <Image
              source={require("../../assets/images/temper.png")}
              style={[{ width: 30, height: 30, marginRight: 80}]}
            />
        </View>
        <LineChart
          data={tempdata}
          width={Dimensions.get('window').width*0.9} // from react-native
          height={180}
          yAxisLabel={''}
          yAxisSuffix={'°C'}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffbd8a',
            backgroundGradientTo: '#ffbd8a',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: 'rgba(0,0,0,0)',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View>
        <View style={[styles.row]}>
          <Text style={{ fontSize: 19, textAlign: 'center', fontWeight:"bold", fontStyle:'italic', marginLeft: 32 }}>Biểu đồ cảm biến ánh sáng</Text>
          <Image
              source={require("../../assets/images/luminous.png")}
              style={[{ width: 30, height: 30, marginRight: 32 }]}
            />
        </View>
        <LineChart
          data={luxdata}
          width={Dimensions.get('window').width*0.9} // from react-native
          height={180}
          yAxisLabel={''}
          yAxisSuffix={' lux'}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#ffff80',
            backgroundGradientTo: '#ffff80',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 85, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 85, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: 'rgba(0,0,0,0)',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={{ position: 'absolute', left: 115, right: 0, bottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200 }}>
        <TouchableOpacity style={{
            backgroundColor: "#6effa0",
            padding: 13,
            borderWidth: 1,
            borderColor: "#000",
            borderRadius:10,
            marginRight:60,
          }} onPress={() => { navigation.navigate("Dashboard",account.route.params) }}>
          <Text style={{ }}>DBoard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
            marginLeft: 60,
            backgroundColor: "#03fc5a",
            padding: 13,
            borderWidth: 1,
            borderColor: "#000",
            borderRadius:10,
          }} onPress={() => { navigation.navigate("Graphs",account.route.params) }}>
          <Text style={{fontWeight:'bold', fontStyle:'italic'}}>Graphs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#96f6ff',
    //justifyContent: 'center',
  },
  table: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#EA9939',
    borderRadius: 20,
    padding: 5,
    backgroundColor: "#fff"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cell: {
    width: 300,
    height: 60,
    alignItems: 'center',
    backgroundColor: "#fff",

  },
  main: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  sub: {
    width: 100,
  },
  roomtable: {

  },
  roomrow: {
    flexDirection: 'row',
    backgroundColor: "#fff",
  },
  roomcell: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
    width: 140,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: "#FFE0BC"
  },
  routineTable: {
    paddingVertical: 10,
    flexDirection: 'column',
    backgroundColor: "#fff",
  },
  routineCell: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: "#FFE0BC"
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  }
});

