import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SaveButton = ({
  onPress = () => {},
  children,
  style = styles.buttonStyle,
  title = 'default',
  touchable = true,
}) => {
  const buttonStyle = { ...styles.buttonStyle, ...style };
  let activeOpacity = 0.2;
  if (touchable === false) {
    activeOpacity = 1.0;
  }
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} activeOpacity={activeOpacity}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(233, 175, 44)',
    //borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(198, 148, 0)',
  },
};

export default SaveButton;
