import React, { Component } from 'react';
import { StyleSheet, View, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LoginForm from '../components/MyLoginForm';

class LoginScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          {/* <Header headerText="Silcon Prarie" /> */}
          <View style={styles.logoView}>
            <Image
              style={styles.logo}
              source={require('../../assets/icons/silicon-prairie-logo.png')}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
