import React from 'react';
import { Text } from 'react-native';

const TextIndent = ({ children }) => {
  const { textStyle } = styles;

  return (
    <Text style={textStyle}>
      {`      ${children}`}
    </Text>
  );
};

const styles = {
  textStyle: {
    // fontSize: 16,
    // fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 2,
  },
};

export { TextIndent };
