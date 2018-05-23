import React from 'react';
import { View, TouchableOpacity} from 'react-native';


const makeHeaderButton = (Component, name) => ({ onPress }) => (
    <View style={{ paddingRight: 15 }}>
      <TouchableOpacity onPress={onPress}>
        <Component name={name} size={27} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );

  const HeaderButton = ({Comp, name, onPress}) => (
    <View style={{ paddingRight: 15 }}>
      <TouchableOpacity onPress={onPress}>
        <Comp name={name} size={27} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );

  export default HeaderButton;


