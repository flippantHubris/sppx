// Import libraries for making a component
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const renderButton = (showButton, onPress) => {
  if (showButton === true) {
    return (
      <TouchableOpacity style={styles.touch} onPress={onPress}>
        <FontAwesome name="edit" size={28} color={'white'} style={styles.iconStyle} />
      </TouchableOpacity>
    );
  }
};
// Make a component
const Header = props => {
  const { textStyle, viewStyle } = styles;
  let { showButton = true } = props;
  let { onPress = () => console.log('button pressed') } = props;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
      {/* <TouchableOpacity style={styles.touch}>
        <FontAwesome name="edit" size={28} color={'white'} style={styles.iconStyle} />
      </TouchableOpacity> */}

      {/* {renderButton(showButton, onPress)} */}
    </View>
  );
};

const styles = {
  viewStyle: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    // backgroundColor: '#F8F8F8',
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    //paddingTop: 20,
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.2,
    //elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  touch: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  iconStyle: {
    // position: 'absolute',
    // alignSelf: 'flex-end',
    //marginRight: 20,
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
};

// Make the component available to other parts of the app
export { Header };
