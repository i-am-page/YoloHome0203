import { StyleSheet, Image, Text, View, Dimensions, TextInput, TouchableOpacity,Alert, ImageBackground } from 'react-native';
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
      <ImageBackground source={require('../../assets/images/smartbackground.jpg')} style={{ width: deviceWidth, height: 'auto', aspectRatio: 0.46, }}>
      
      <View style={[styles.bottomView]}>
        <Text style={[styles.title,]}>Sign In</Text>
        <TextInput style={styles.input} placeholder="User Name" placeholderTextColor="#7a807c" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#7a807c" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={[styles.button]} onPress={handleLogIn}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 18, height: 30, fontWeight: "bold" }}>Sign In</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'right', color: 'black', fontSize: 14, height: 20, marginTop:-18, }}>Don't have account yet?</Text>
        <TouchableOpacity style={[]} onPress={createAccount}>
          <Text style={{ textAlign: 'right', color: '#32a852', fontSize: 14, height: 20, marginRight:30, fontStyle:'italic', fontWeight: "bold"}}>Create Account</Text>
        </TouchableOpacity>
      </View>
      
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#a7abb0',
  },
  title: {
    textAlign: 'right',
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 85,
    marginRight: 60,
    marginBottom: 5,
  },
  input: {
    height: 50,
    margin: 5,
    marginLeft: 50,
    borderWidth: 1,
    padding: 10,
    width: deviceWidth * 3 / 4,
    borderRadius: 10,
    color: '#000000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#63ebdd',
    height: 40,
    margin: 20,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  bottomView: {

  },
});
