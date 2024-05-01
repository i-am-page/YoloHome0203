
import { Dimensions, StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { apiFacade } from './apiFacade';
import { StackNavigationProp } from '@react-navigation/stack';
import { LineChart } from 'react-native-chart-kit';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Chart: undefined;
  // Add other screens here
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Chart'>;
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
              data: datasets[0].data,
              color: (opacity = 1) => `rgba(0,210,255, ${opacity})`, // optional
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
              data: datasets[1].data,
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
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight:"bold" }}>Biểu đồ độ ẩm 7 ngày qua</Text>
        <LineChart
          data={humidata}
          width={Dimensions.get('window').width*0.9} // from react-native
          height={180}
          yAxisLabel={''}
          yAxisSuffix={'%'}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#000000',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
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
        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight:"bold"  }}>Biểu đồ nhiệt độ 7 ngày qua</Text>
        <LineChart
          data={tempdata}
          width={Dimensions.get('window').width*0.9} // from react-native
          height={180}
          yAxisLabel={''}
          yAxisSuffix={'\'C'}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
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
        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight:"bold"  }}>Biểu đồ ánh sáng cảm biến 7 ngày qua</Text>
        <LineChart
          data={luxdata}
          width={Dimensions.get('window').width*0.9} // from react-native
          height={180}
          yAxisLabel={''}
          yAxisSuffix={'\'C'}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={{ position: 'absolute', left: 100, right: 0, bottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200 }}>
        <TouchableOpacity style={{ backgroundColor: '#FDA43C', padding: 10, borderWidth : 1, borderColor: '#000', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}} onPress={() => { navigation.navigate("Home",account.route.params) }}>
          <Text style={{ }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#FDA43C', padding: 10, borderWidth : 1, borderColor: '#000', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} onPress={() => { navigation.navigate("Chart",account.route.params) }}>
          <Text style={{ }}>Chart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
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

