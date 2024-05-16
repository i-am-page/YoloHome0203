import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Homepage } from './src/screens/Homepage';
import { Login } from './src/screens/login';
import { Chart } from './src/screens/Chart';
import { Signup } from './src/screens/signup';
import 'react-native-gesture-handler';

// import { UserProvider } from './src/components/UserContext';\

const Stack = createStackNavigator();
export default function App() {
return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="Dashboard" component={Homepage} />
        <Stack.Screen name="SignIn" component={Login} />
        <Stack.Screen name="Graphs" component={Chart} />
        <Stack.Screen name="SignUp" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}