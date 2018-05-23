import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import color from '@constants/Colors';

const Spinner = ({ size }) => (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} color={color.green} />
    </View>
  );

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
