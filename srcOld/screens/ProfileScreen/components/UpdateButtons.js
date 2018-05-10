// import React from 'react';
// import { View, Text } from 'react-native';
// import { Spinner } from 'common';
// import UpdateButton from './UpdateButton';
// import glamorous, {ThemeProvider} from 'glamorous-native'

import { React, View } from '../../../globals';
import UpdateButton, { SaveButton, CancelButton } from './UpdateButton';

//import UpdateButton from './UpdateButton';
//import UpdateButtons, { SaveButton } from 'react';

const UpdateButtons = props => {
  const {
    showButtons = false,
    showSpinner = false,
    hasBeenEdited = false,
    onSave = () => {},
    onCancel = () => {},
  } = props;

  return (
    <View style={styles.buttonView}>
      <SaveButton onPress={onCancel()} title="Save" touchable={true} />
      <CancelButton onPress={onCancel()} title="Cancel" />
    </View>
  );
};

const styles = {
  spinnerView: {
    //marginTop: 200,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editSpinner: {
    marginTop: 10,
  },
  editButtons: {
    // flex: 1,
    // justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  editButton: {
    flex: 1,
  },
  buttonView: {
    // marginTop: 20,
    // marginBottom: 20,
    flexDirection: 'row',
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default UpdateButtons;
//
// if (this.props.updatingProfile) {
//   return (
//     <View style={styles.editSpinner}>
//       <Spinner size="large" />
//     </View>
//   );
// } else if (this.props.isEditable) {
//   if (this.props.hasBeenEdited) {
//     return (
//       <View style={styles.editButtons}>
//         <UpdateButton
//           onPress={() => {
//             this.props.resetProfile();
//             this.props.cancelButtonPressed();
//           }}
//           title="Cancel"
//         />
//         <UpdateButton
//           onPress={() => this.props.updateProfile()}
//           style={{
//             backgroundColor: 'rgb(124, 208, 140)',
//             borderColor: 'rgb(2, 173, 76)',
//           }}
//           title="Save"
//         />
//       </View>
//     );
//   } else {
//     return (
//       <View style={styles.editButtons}>
//         <UpdateButton
//           onPress={() => {
//             this.props.resetProfile();
//             this.props.cancelButtonPressed();
//           }}
//           title="Cancel"
//         />
//         <UpdateButton
//           touchable={false}
//           onPress={() => null}
//           style={{
//             backgroundColor: 'rgb(108, 108, 108)',
//             borderColor: 'rgb(64, 64, 64)',
//           }}
//           title="Save"
//         />
//       </View>
//     );
//   }
// }
