import { StyleSheet, View } from "react-native";

import WelcomeHeader from "../components/welcome/welcomeHeader";
import StartActivities from "../components/welcome/startActivities";
import Join from "../components/join/join";
import Login from "../components/login/login";
import { createContext, useState } from "react";

export const WelcomeContext = createContext();

const Welcome = (props) => {
  const [joinModalIsVisible, setJoinModalIsVisible] = useState(false);
  const [loginModalIsVisible, setLoginModalIsVisible] = useState(false);

  const startJoin = () => {
    setJoinModalIsVisible(true);
  };

  const endJoin = () => {
    setJoinModalIsVisible(false);
  };

  const startLogin = () => {
    setLoginModalIsVisible(true);
    setJoinModalIsVisible(false);
  };

  const endLogin = () => {
    setLoginModalIsVisible(false);
  };

  return (
    <WelcomeContext.Provider value={{ startLogin }}>
      <View style={styles.welcomeContainer}>
        <WelcomeHeader />
        <StartActivities onStartJoin={startJoin} onStartLogin={startLogin} />
        {joinModalIsVisible && (
          <Join onEndJoin={endJoin} onLogin={startLogin} />
        )}
        {loginModalIsVisible && <Login onEndLogin={endLogin} />}
      </View>
    </WelcomeContext.Provider>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  welcomeContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
});
