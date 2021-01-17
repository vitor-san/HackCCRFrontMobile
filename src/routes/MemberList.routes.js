// REACT E REACT NAVIGATION IMPORTS

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// COMPONENTS

import ViewProfile from '../pages/ViewProfile';
import MemberList from '../pages/MemberList';

//              MEMBER LIST STACK
// MEMBER LIST E O PERFIL DO MEMBRO (QUE NAO É O LOGADO)

const MemberListStack = createStackNavigator();

export default function MemberListStackScreen() {
  return (
    <MemberListStack.Navigator screenOptions={{ headerShown: false }}>
      <MemberListStack.Screen name="MemberList" component={MemberList} />
      <MemberListStack.Screen
        name="MemberViewProfile"
        component={ViewProfile}
      />
    </MemberListStack.Navigator>
  );
}
