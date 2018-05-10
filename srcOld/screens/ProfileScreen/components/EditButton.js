import React from 'react';

import { FontAwesome, TouchableOpacity, glamorous } from '../../../globals';

const GlamTouch = glamorous.touchableOpacity({
  position: 'absolute',
  alignSelf: 'flex-end',
});

const GlamIcon = glamorous(FontAwesome)({
  paddingRight: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.0)',
});

const EditButton = props => {
  const { onPress = () => console.log('button pressed') } = props;
  //const onPress = () => console.log('button pressed');

  return (
    <GlamTouch onPress={onPress}>
      {/* <GlamIcon /> */}
      <FontAwesome name="edit" size={28} color={'rgb(46, 204, 113)'} style={styles.iconStyle} />
    </GlamTouch>
  );
};

const styles = {
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
export default EditButton;
