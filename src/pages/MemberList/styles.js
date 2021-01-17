import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../globalStyles';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  searchBar: {
    backgroundColor: colors.secondary,
    height: 0.2 * height,
  },
  nameSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    height: 0.07 * height,
    width: 0.85 * width,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 30,
    marginTop: 13,
    paddingHorizontal: 16,
  },
  nameSearchPlaceholder: {
    height: 0.08 * height,
    width: 0.9 * width,
    borderRadius: 30,
    marginTop: 13,
    alignSelf: 'center',
  },

  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPlaceholder: {
    height: 0.15 * height,
    width: 0.9 * width,
    marginTop: 13,
    alignSelf: 'center',
  },

  PickerView: {
    marginLeft: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.black,
    overflow: 'hidden',
  },
  Picker: {
    backgroundColor: colors.white,
    height: 23,
    width: 117,
    paddingHorizontal: 0.027 * width,
  },
  line: {
    backgroundColor: colors.black,
    height: 1,
    width: 0.8 * width,
    alignSelf: 'center',
    margin: 5,
  },
  cardsContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: 0.025 * width,
  },
  card: {
    alignItems: 'center',
    borderColor: colors.grey4,
    borderRadius: 6,
    borderWidth: 0.5,
    marginTop: 5,
    height: 0.15 * height,
    elevation: 2,
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    paddingHorizontal: 0.05 * width,
  },
  avatar: {
    backgroundColor: colors.white,
    alignSelf: 'center',
  },
  memberInfo: {
    justifyContent: 'space-evenly',
    paddingLeft: 0.025 * width,
  },
  nickname: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 0.4 * width,
  },
  name: {
    fontSize: 14,
    width: 0.4 * width,
    color: colors.grey3,
  },
  team: {
    fontSize: 14,
    width: 0.4 * width,
  },

  iconsInfo: {
    paddingLeft: 0.1 * width,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  carIcon: {
    paddingLeft: 0.12 * width,
  },
});
