// REACT E REACT NAVIGATION IMPORTS
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

// COMPONENTS
import BottomTab from './BottomTab.routes';
import EditProfile from '../pages/EditProfile';

// STACK DO APP
const mainStack = createStackNavigator();

export default function MainStack() {
  return (
    <mainStack.Navigator screenOptions={{ headerShown: false }}>
      <mainStack.Screen name="BottomTab" component={BottomTab} />
      <mainStack.Screen name="EditProfile" component={EditProfile} />
    </mainStack.Navigator>
  );
}
