import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { height, width } = Dimensions.get('window');

export const colors = {
  primary: '#003D5C',
  secondary: '#3DACE1',
  orange: '#F79839',
  black: '#000000',
  transBlack: '#000000aa',
  grey1: '#222222',
  grey2: '#7D7D7D',
  grey3: '#B7B7B7',
  grey4: '#DDD',
  grey5: '#ECECEC',
  white: '#FFFFFF',
  green: '#8EA604',
  red: '#F22B29',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.secondary,
  },
  authContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.primary,
    paddingVertical: 48,
  },
  footer: {
    height: 0.08 * height,
  },
  footerText: {
    fontWeight: '500',
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
  },
  showCrown: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 35,
  },
  hideCrown: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 35,
  },
  editSaveButton: {
    marginRight: 0.11 * width,
    alignSelf: 'center',
  },
  hideEditSaveButton: {
    marginRight: 0.18 * width,
  },
  input: {
    width: 0.86 * width,
    height: 0.07 * height,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputIcon: {
    justifyContent: 'center',
  },
  successButton: {
    marginTop: 0.03 * height,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.75 * width,
    height: 0.07 * height,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 30,
  },
  buttonText: {
    alignSelf: 'center',
    fontWeight: '900',
    fontSize: 16,
    color: colors.white,
  },
  errorButton: {
    marginTop: 0.03 * height,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.75 * width,
    height: 0.07 * height,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 30,
  },
});
