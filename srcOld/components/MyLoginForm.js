/* flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert, Keyboard } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';

import {
  emailChanged,
  passwordChanged,
  getAuthToken,
  loginUser,
  logout,
  main,
  loginThunk,
  fileThunk,
  onChange,
} from '../actions';
import { profileActions } from '../reducers/ducks/profile/action';

const alert = () => ({ type: 'ALERT' });

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password, authToken } = this.props;
    // this.props.loginUser(email, password, authToken);
    this.props.loginThunk();
    console.log('login');
    Keyboard.dismiss();
  }

  onLogoutButtonPress() {
    this.props.logout(this.props.authToken);
  }

  componentWillMount() {
    this.props.getAuthToken();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }

  pickImage = async () => {
    // const result = await ImagePicker.launchImageLibraryAsync({
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });
    this.props.onChange('SET_IMAGE', result);
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Input
              label="Username"
              placeholder="username"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          <CardSection>
            {this.renderButton()}
            {/* <Button onPress={() => this.props.navigate('lobby')}>
              Login
            </Button> */}
          </CardSection>

          {/* <CardSection>
            <Button onPress={() => this.props.fileThunk()}>
              file
            </Button>
          </CardSection> */}

          <CardSection>
            <Button onPress={() => this.props.navigate('register')}>Register</Button>
          </CardSection>
          <CardSection>
            {/* <Button onPress={() => this.props.navigate('lobby')}>Bypass</Button> */}
            <Button onPress={() => this.props.navigate('invest')}>Bypass</Button>
          </CardSection>

          <CardSection>
            {/* <Button onPress={() => this.props.navigate('lobby')}>Bypass</Button> */}
            <Button onPress={() => this.props.postLogout()}>Logout</Button>
          </CardSection>

          {/* <CardSection>
            <Button onPress={this.props.navigation.navigate('DrawerOpen')}>
              pickImage
            </Button>
          </CardSection> */}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, authToken, error, loading, isLoggedIn } = auth;

  return { email, password, authToken, error, loading, isLoggedIn };
};
const postLogout = profileActions.postLogout;

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  getAuthToken,
  loginUser,
  logout,
  loginThunk,
  alert,
  fileThunk,
  onChange,
  postLogout,
})(LoginForm);
