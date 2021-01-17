import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../globalStyles';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  content: {
    justifyContent: 'space-between',
  },
  forgotPassword: {
    marginBottom: height * 0.03,
    marginLeft: 2,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.orange,
  },
});
