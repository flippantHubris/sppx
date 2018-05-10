const input = (props, section, field) => (
  <CardSection key={field}>
    <Input
      label={field}
      onChangeText={text => props.onProfileChange(section, field, text)}
      value={props[section][field]}
      //editable={false}
    />
  </CardSection>
);

const cInput = R.curry(input);

const createSection = (props, section, fields, options) => {
  return fields.map(cInput(props, section));
};

const inject = (props, func) => {
  const newFunc = R.curry(func);
  return newFunc(props);
};

const makeToggle = () => {
  let tog = true;
  const func = () => {
    console.log('testing2');
    return (tog = R.not(tog));
  };
  console.log('testing3');
  return func;
};
const toggle = makeToggle();

//updateButton.js

const GlamTouch = glamorous.touchableOpacity({
  flex: 1,
  alignSelf: 'stretch',
  borderWidth: 1,
  backgroundColor: 'rgb(199, 199, 199)',
  borderColor: 'rgb(159, 159, 159)',
  opacity: 1,
});

const GlamGrey = <GlamTouch activeOpacity={1} />;

const GlamCancel = glamorous(GlamTouch)({
  backgroundColor: 'rgb(233, 175, 44)',
  borderColor: 'rgb(198, 148, 0)',
});

const GlamSave = glamorous(GlamTouch)({
  backgroundColor: 'rgb(46, 204, 113)',
  borderColor: 'rgb(43, 177, 100)',
});

const GlamText = glamorous.text({
  alignSelf: 'center',
  color: 'rgb(255, 255, 255)',
  fontSize: 16,
  fontWeight: '600',
  paddingTop: 10,
  paddingBottom: 10,
});

//const UnstyledComp = ({ style, children }) => <View style={[style, otherStyle]}>{children}</View>;

// const NewButton = ({ style, props }) => {
//   //const { onPress = () => {}, title = 'button', touchable = true } = props;
//   // console.log('yooooooooooo');
//   // console.log(style);
//   console.log(props);
//   //
//   // let activeOpacity = 0.2;
//   // if (touchable === false) {
//   //   activeOpacity = 1.0;
//   // }
//   return (
//     // <TouchableOpacity onPress={onPress} style={buttonStyle} activeOpacity={activeOpacity}>
//     //   <Text style={styles.textStyle}>{title}</Text>
//     // </TouchableOpacity>
//     <GlamTouch>
//       <GlamText>hellio</GlamText>
//     </GlamTouch>
//   );
// };

// const UpdateButton = props => {
//   const { onPress = () => {}, title = 'button', touchable = true } = props;
//
//   let activeOpacity = 0.2;
//   if (touchable === false) {
//     activeOpacity = 1.0;
//   }
//   return (
//     // <TouchableOpacity onPress={onPress} style={buttonStyle} activeOpacity={activeOpacity}>
//     //   <Text style={styles.textStyle}>{title}</Text>
//     // </TouchableOpacity>
//     <GlamTouch>
//       <GlamText>{title}</GlamText>
//     </GlamTouch>
//   );
// };

// export const SaveButton = props => {
//   const { onPress = () => {}, title = 'button', touchable = false } = props;
//
//   let activeOpacity = 0.2;
//   if (touchable === false) {
//     activeOpacity = 0.0;
//   }
//
//   if (touchable === true) {
//     return (
//       <GlamSave>
//         <GlamText>{title}</GlamText>
//       </GlamSave>
//     );
//   } else {
//     return (
//       // <GlamTouch activeOpacity={1}>
//       //   <GlamText>{title}</GlamText>
//       // </GlamTouch>
//       <GlamGrey activeOpacity={1}>
//         <GlamText>{title}</GlamText>
//       </GlamGrey>
//     );
//   }
// };
//
// export const CancelButton = props => {
//   const { onPress = () => {}, title = 'button', touchable = true } = props;
//
//   let activeOpacity = 0.2;
//   if (touchable === false) {
//     activeOpacity = 1.0;
//   }
//   return (
//     // <TouchableOpacity onPress={onPress} style={buttonStyle} activeOpacity={activeOpacity}>
//     //   <Text style={styles.textStyle}>{title}</Text>
//     // </TouchableOpacity>
//     <GlamCancel>
//       <GlamText>{title}</GlamText>
//     </GlamCancel>
//   );
// };

// const MyComponent = props => <Text {...props} />
// const glamButtonFac = glamorous(Button)
// const glamButton = glamButtonFac(styles.buttonStyle)
