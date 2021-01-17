import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../globalStyles';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  profileContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  photographyContainer: {
    height: 0.16 * height,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0.05 * width,
  },
  cancelText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  editButtonContainer: {
    backgroundColor: colors.primary,
    height: 0.1 * height,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 0.05 * width,
  },
  photo: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 0.01 * height,
  },
  cameraContainer: {
    position: 'absolute',
    top: 5,
    bottom: 40,
    left: 55,
    marginTop: 0.125 * height,
    justifyContent: 'flex-end',
  },
  camera: {
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: colors.secondary,
    backgroundColor: colors.white,
    height: 0.1 * width,
    width: 0.1 * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  standartAvatar: {
    marginTop: 0.065 * height,
    alignSelf: 'center',
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: colors.secondary,
    backgroundColor: colors.white,
  },
  avatar: {
    width: 0.18 * width,
    height: 0.18 * width,
    resizeMode: 'cover',
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: colors.secondary,
    alignSelf: 'center',
  },

  infoContainer: {
    alignItems: 'center',
  },
  names: {
    marginHorizontal: 0.1 * width,
    marginBottom: 0.015 * height, // margin entre os nomes e as info
  },
  nameBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    marginTop: 0.02 * height, // margem entre as box de nome
  },
  nameInput: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.grey2,
  },
  informations: {
    marginHorizontal: 0.1 * width,
  },
  iconTextContainer: {
    flexDirection: 'row',
    marginTop: 0.015 * height, //  margem entre as info
  },
  infoBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    width: 0.69 * width,
    justifyContent: 'center', // centralizar o texto na box
    marginLeft: 0.04 * width, // margin entre a box e o icone
  },
  infoInput: {
    alignSelf: 'stretch',
    paddingHorizontal: 0.025 * width, // padding entre o texto e o inicio da box
    color: colors.grey2,
    fontSize: 14,
  },
  carTeamContainer: {
    marginTop: 0.027 * height,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  carTeamButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 3,
    height: 0.085 * width,
    width: 0.085 * width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  car: {
    alignSelf: 'center',
  },
  passwordContainer: {
    marginTop: 0.033 * height,
    width: 0.28 * width,
    height: 0.033 * height,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.primary,
  },
  password: {
    marginTop: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
});
