import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  buttonsView: {
    height: height * 0.3,
    marginTop: height * 0.02,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
