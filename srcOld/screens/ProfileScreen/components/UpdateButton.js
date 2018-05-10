import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { glamorous } from '../../../globals';

const MakeButton = style => props => {
  const { onPress = () => {}, title = 'button', touchable = true } = props;
  console.log(props);
  //
  let sty = style;
  let activeOpacity = 0.2;
  if (touchable === false) {
    activeOpacity = 1.0;
    sty = styles.grey;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.buttonStyle, ...sty }}
      activeOpacity={activeOpacity}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const UpdateButton = MakeButton({
  backgroundColor: 'rgb(46, 204, 113)',
  //borderColor: 'rgb(43, 177, 100)',
});

export const SaveButton = MakeButton({
  backgroundColor: 'rgb(46, 204, 113)',
  //borderColor: 'rgb(43, 177, 100)',
});

export const CancelButton = MakeButton({
  backgroundColor: 'rgb(233, 175, 44)',
  // borderColor: 'rgb(198, 148, 0)',
});

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
    borderWidth: 2,
    //borderColor: 'rgba(198, 148, 0, 0.2)',
    borderColor: 'rgb(255, 255, 255)',
    margin: 0,
  },
  grey: {
    backgroundColor: 'rgb(199, 199, 199)',
    //borderColor: 'rgb(159, 159, 159)',
  },
  green: {
    backgroundColor: 'rgb(199, 199, 199)',
    //borderColor: 'rgb(159, 159, 159)',
  },
};

export default UpdateButton;
