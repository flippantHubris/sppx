/* flow */

import React from 'react';
import { TextInput, View, Text } from 'react-native';

const InputSection = ({ label, children }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = {
  content: {
    minHeight: 45,
    //color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    // paddingTop: 20,
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  labelStyle: {
    fontSize: 16,
    paddingLeft: 20,
    flex: 1,
    color: 'rgb(158, 158, 158)',
  },
  containerStyle: {
    minHeight: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export { InputSection };
