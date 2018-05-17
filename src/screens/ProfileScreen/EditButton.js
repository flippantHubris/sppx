import { View } from "react-native";
import React from "react";

import { FontAwesome, TouchableOpacity } from "../../globals";

const EditButton = ({ props }) => {
  // const { onPress = () => console.log('edit button pressed') } = props;
  const { onPress = () => console.log("button pressed3") } = props;
  return (
    <View style={styles.defaultStyle}>
      <TouchableOpacity style={styles.touch} onPress={onPress}>
        <FontAwesome
          name="edit"
          size={28}
          color="white"
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  viewStyle: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    // backgroundColor: '#F8F8F8',
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    // paddingTop: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // elevation: 2,
    position: "relative"
  },
  textStyle: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold"
  },
  touch: {
    position: "absolute",
    alignSelf: "flex-end"
  },
  iconStyle: {
    // position: 'absolute',
    // alignSelf: 'flex-end',
    // marginRight: 20,
    paddingRight: 10,
    backgroundColor: "rgba(255, 255, 255, 0.0)"
  }
};
export default EditButton;
