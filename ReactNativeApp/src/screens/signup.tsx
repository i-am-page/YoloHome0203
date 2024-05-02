import { StyleSheet, Image, Text, View, Dimensions, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { apiFacade } from './apiFacade';
type RootStackParamList = {
  Dashboard: undefined;
  SignIn: undefined;
  Graphs: undefined;
  Signup: undefined;
  // Add other screens here
};
type NavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
const deviceWidth = Dimensions.get('window').width;
export const Signup = () => {
  const navigation = useNavigation<NavigationProp>();
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = async () => {
    console.log(username);
    console.log(nickname);
    console.log(password);
    const res = await apiFacade.signup(username,nickname,password);
    if (res != "Existing Account") {
      console.log("Account Inavailable");
    } else {
      console.log("Account Created");
    }
  };
  const login = () => {
    navigation.replace('SignIn');
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/smartbackground.jpg')}
        style={{ width: deviceWidth, height: 'auto', aspectRatio: 0.43, }}
      >
      <View style={[styles.bottomView]}>
        <Text style={[styles.title,]}>Sign Up</Text>
        <TextInput style={styles.input} placeholder="User Name" placeholderTextColor="#7a807c" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Visible Name" placeholderTextColor="#7a807c" value={nickname} onChangeText={setNickname} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#7a807c" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={[styles.button]} onPress={handleSignUp}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 18, height: 30, fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'right', color: 'black', fontSize: 14, height: 20, marginRight: 30 }}>Have An Account?</Text>
        <TouchableOpacity style={[]} onPress={login}>
          <Text style={{ textAlign: 'right', fontSize: 14, height: 20, fontStyle:'italic', fontWeight:'bold', color: '#32a852',  marginRight:90}}>Sign In</Text>
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
    marginTop: 95,
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
    marginTop: 10,
    backgroundColor: '#63ebdd',
    height: 40,
    margin: 30,
    marginBottom: 5,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  bottomView: {

  },
});
