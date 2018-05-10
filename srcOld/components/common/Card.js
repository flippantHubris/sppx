import React from 'react';
import { View } from 'react-native';

const Card = props => {
  const { rounded = false } = props;
  if (rounded === true) {
    return <View style={styles.round}>{props.children}</View>;
  } else {
    return <View style={styles.containerStyle}>{props.children}</View>;
  }
};
const styles = {
  containerStyle: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  round: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
};

export { Card };
