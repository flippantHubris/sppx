import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const CardSection = ({ children, style, showDivider = true }) => {
  //console.log('card childern =');
  // console.log(children);
  const log = child => {
    console.log(child.type.name);
    console.log(child.type);
    // console.log(child);
  };
  React.Children.map(children, log);
  if (showDivider === true) {
    return (
      <View style={styles.container}>
        <View style={[styles.input, style]}>
          {getNotDescription(children)}
          {/* <TouchableOpacity style={styles.touch}>
            <Entypo name="edit" size={28} color={'#2ecc71'} style={styles.iconStyle} />
          </TouchableOpacity> */}
        </View>
        <View>{getDescription(children)}</View>
      </View>
    );
  } else {
    return <View style={[styles.noDivider, style]}>{children}</View>;
  }
};

const getNotDescription = children => {
  return React.Children.map(children, child => {
    if (child.type.name !== 'SubField') return child;
  });
};

const getDescription = children => {
  return React.Children.map(children, child => {
    if (child.type.name === 'SubField') return child;
  });
};

/* <FontAwesome name="edit" size={28} color={'white'} style={styles.iconStyle} /> */

const styles = {
  container: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  input: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
  touch: {},
  noDivider: {
    //borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    //borderColor: '#ddd',
    position: 'relative',
  },
};

export { CardSection };
