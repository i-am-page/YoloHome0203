import { StyleSheet, Image, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { apiFacade } from './apiFacade';
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Chart: undefined;
  Signup: undefined;
  // Add other screens here
};
type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
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
      console.log("Can't create account");
    } else {
      console.log("Created Account");
    }
  };
  const login = () => {
    navigation.replace('Login');
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/background.png')}
        style={{ width: deviceWidth, height: 'auto', aspectRatio: 1.0, }}
      />
      <View style={[styles.bottomView]}>
        <Text style={[styles.title,]}>Sign Up</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Nickname" value={nickname} onChangeText={setNickname} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={[styles.button]} onPress={handleSignUp}>
          <Text style={{ textAlign: 'center', color: 'black', fontSize: 18, height: 30, fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', color: 'black', fontSize: 14, height: 20 }}>Have account yet ?</Text>
        <TouchableOpacity style={[]} onPress={login}>
          <Text style={{ textAlign: 'center', color: '#FDA43C', fontSize: 14, height: 20, textDecorationLine: "underline" }}>Log In</Text>
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
