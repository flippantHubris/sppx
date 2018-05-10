import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import LoginForm from "./LoginForm";

class LoginScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* <Header headerText="Silcon Prarie" /> */}
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={require("@assets/images/silicon-prairie-logo.png")}
            />
          </View>
          <LoginForm navigate={navigate} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  logoView: {
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 150,
    height: 200
  },
  container: {
    backgroundColor: "#fff"
  },
  containerOld: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LoginScreen;
