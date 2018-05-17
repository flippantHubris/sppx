import React from "react";

import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// const GlamTouch = glamorous.touchableOpacity({
//   position: "absolute",
//   alignSelf: "flex-end"
// });

// const GlamIcon = glamorous(FontAwesome)({
//   paddingRight: 10,
//   backgroundColor: "rgba(255, 255, 255, 0.0)"
// });

const EditButton = props => {
  const { onPress = () => console.log("button pressed") } = props;

  return (
    <TouchableOpacity style={styles.touch} onPress={onPress}>
      <FontAwesome
        name="edit"
        size={28}
        color="#2ecc71"
        style={styles.iconStyle}
      />
    </TouchableOpacity>
  );
};

const styles = {
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
