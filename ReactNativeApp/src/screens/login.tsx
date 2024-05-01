import { StyleSheet, Image, Text, View, Dimensions, TextInput, TouchableOpacity,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { apiFacade } from './apiFacade';
import AsyncStorage from '@react-native-async-storage/async-storage';
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Chart: undefined;
  Signup: undefined;
  // Add other screens here
};
type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
const deviceWidth = Dimensions.get('window').width;
export const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogIn = async () => {
    try{
      const res = await apiFacade.login(username, password);
      console.log(res);
      if (res != "Invalid password") {
        saveToken(res.token);
        navigation.replace('Home', res);
        console.log("Logged In");
      }
    }catch(e){
      console.log(e);
      Alert.alert("Invalid username or password");
    }
  };
  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }
  const createAccount = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/background.png')}
        style={{ width: deviceWidth, height: 'auto', aspectRatio: 1.0, }}
      />
      <View style={[styles.bottomView]}>
        <Text style={[styles.title,]}>Log In</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={[styles.button]} onPress={handleLogIn}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 18, height: 30, fontWeight: "bold" }}>Log In</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, height: 20 }}>Don't have account yet ?</Text>
        <TouchableOpacity style={[]} onPress={createAccount}>
          <Text style={{ textAlign: 'center', color: '#FDA43C', fontSize: 14, height: 20, textDecorationLine: "underline" }}>Create Account</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: deviceWidth * 3 / 4,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#FDA43C',
    height: 40,
    margin: 12,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  bottomView: {

  },
});
