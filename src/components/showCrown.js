import React from 'react';
import { Image, View } from 'react-native';

import globalStyles from '../globalStyles';

import crownIcon from '../assets/Icons/crown.png';

export default function ShowCrown({ show }) {
  if (show === false) {
    return <View style={globalStyles.hideCrown} />;
  }
  return <Image style={globalStyles.showCrown} source={crownIcon} />;
}
