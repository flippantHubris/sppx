/* flow */
import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native';
import { Text, FormLabel, FormInput, Card, Button, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  registerThunk,
  clearError,
  onChange,
  takePicture,
  getPicture,
  fileThunk,
} from '../actions';
import { Spinner } from '../components/common';

class RegisterScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button
        buttonStyle={{ borderRadius: 5 }}
        raised
        title="Create New Account"
        backgroundColor="#2ecc71"
        textStyle={{ fontSize: 20 }}
        onPress={() => this.props.registerThunk()}
      />
    );
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onChange(text) {
    this.props.emailChanged(text);
  }

  componentWillMount() {
    //  json();
  }

  componentDidUpdate() {
    if (this.props.error != '') {
      Alert.alert(
        'Error',
        this.props.error,
        [{ text: 'OK', onPress: () => this.props.clearError() }],
        { cancelable: true }
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.titleView}>
          <Text h4 style={styles.textStyle}>
            Create New Account
          </Text>
        </View>
        <FormLabel>Username</FormLabel>
        <FormInput
          placeholder="Enter username..."
          onChangeText={text => this.props.onChange('USERNAME_CHANGED', text)}
          value={this.props.name}
          autoCapitalize="none"
          // onChangeText={this.onEmailChange.bind(this)}
          // onChangeText={text => this.dispatch({type:'EMAIL', payload:text)}}
        />

        <FormLabel>Email</FormLabel>
        <FormInput
          placeholder="Enter email..."
          onChangeText={text => this.props.onChange('EMAIL_CHANGED', text)}
          value={this.props.email}
          autoCapitalize="none"
        />

        <FormLabel>Confirm Email</FormLabel>
        <FormInput
          placeholder="Enter email again..."
          onChangeText={text => this.props.onChange('EMAIL_CONF_CHANGED', text)}
          value={this.props.confEmail}
          autoCapitalize="none"
        />

        <FormLabel>Password</FormLabel>
        <FormInput
          placeholder="Enter a pin..."
          onChangeText={text => this.props.onChange('PASSWORD_CHANGED', text)}
          value={this.props.password}
          autoCapitalize="none"
        />

        {/* <FormLabel>Phone</FormLabel>
        <FormInput placeholder="Please enter your name..." /> */}

        <Card title="Individual">
          <FormLabel>First Name</FormLabel>
          <FormInput
            placeholder="Enter first name..."
            onChangeText={text => this.props.onChange('FIRSTNAME_CHANGED', text)}
            value={this.props.firstName}
          />

          {/* <FormLabel>Middle Name</FormLabel>
          <FormInput placeholder="Please enter last name..." /> */}

          <FormLabel>Last Name</FormLabel>
          <FormInput
            placeholder="Enter last name..."
            onChangeText={text => this.props.onChange('LASTNAME_CHANGED', text)}
            value={this.props.lastName}
          />

          <FormLabel>Initials</FormLabel>
          <FormInput
            placeholder="Enter your initials..."
            onChangeText={text => this.props.onChange('INITIALS_CHANGED', text)}
            value={this.props.initials}
          />

          <Divider style={{ marginTop: 10 }} />

          <FormLabel>Address</FormLabel>
          <FormInput
            placeholder="Enter last name..."
            onChangeText={text => this.props.onChange('ADDRESS_CHANGED', text)}
            value={this.props.address}
          />

          <FormLabel>City</FormLabel>
          <FormInput
            placeholder="Enter your city..."
            onChangeText={text => this.props.onChange('CITY_CHANGED', text)}
            value={this.props.city}
          />

          <FormLabel>Zip</FormLabel>
          <FormInput
            placeholder="Enter zip..."
            onChangeText={text => this.props.onChange('ZIP_CHANGED', text)}
            value={this.props.zip}
          />
        </Card>

        <View style={styles.buttonView}>{this.renderButton()}</View>
        <View style={styles.buttonView}>
          <Button
            buttonStyle={{ borderRadius: 5 }}
            raised
            title="Back"
            backgroundColor="#F2CA52"
            textStyle={{ fontSize: 20 }}
            onPress={() => this.props.navigation.navigate('login')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 20,
    marginBottom: 30,
  },
  titleView: {
    alignItems: 'center',
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 20,
  },

  imageButtonView: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageButton: {
    height: 40,
    backgroundColor: '#2ecc71',
    marginTop: 5,
    marginBottom: 5,
  },
  imageView: {
    alignItems: 'center',
    paddingTop: 20,
  },
});

// const mapDispatchToProps = dispatch => ({
//   onChange,
//   registerThunk,
//   bak: () => {
//     dispatch({ type: 'GO_BACK' });
//   },
//   clearError: () => {
//     dispatch({ type: 'ClEAR_ERROR' });
//   },
// });

const mapStateToProps = ({ reg, auth }) => {
  const {
    name,
    email,
    confEmail,
    password,
    authToken,
    error,
    loading,
    firstName,
    middleName,
    lastName,
    initials,
    pin,
    address,
    city,
    zip,
    driversLicense,
  } = reg;
  const { token } = auth;
  return {
    name,
    email,
    confEmail,
    password,
    authToken,
    error,
    loading,
    firstName,
    middleName,
    lastName,
    initials,
    pin,
    address,
    city,
    zip,
    reg,
    driversLicense,
  };
};

export default connect(mapStateToProps, {
  onChange,
  registerThunk,
  clearError,
  takePicture,
  getPicture,
  fileThunk,
})(RegisterScreen);
