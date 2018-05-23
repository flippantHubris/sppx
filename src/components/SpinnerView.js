import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import color from '@constants/Colors';

const SpinnerView = () => (
  <View style={styles.spinnerView}>
    <ActivityIndicator size="large" color={color.green} />
  </View>
);

const styles = StyleSheet.create({
  spinnerView: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SpinnerView;
