/* flow */

import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder = '',
  secureTextEntry,
  editable = true,
  autoFocus = false,
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        //autoFocus={true}
        onChangeText={onChangeText}
        underlineColorAndroid={'transparent'}
        editable={editable}
        selectTextOnFocus={true}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    height: 45,
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    // paddingTop: 20,
    fontSize: 19,
    lineHeight: 10,
    flex: 2,
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: 20,
    flex: 1,
    color: 'rgb(158, 158, 158)',
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export { Input };
