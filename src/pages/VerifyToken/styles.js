import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../globalStyles';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  emailContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    marginTop: height * 0.03,
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.white,
    alignSelf: 'center',
  },
  failedButton: {
    marginTop: 0.06 * height,
  },
});
