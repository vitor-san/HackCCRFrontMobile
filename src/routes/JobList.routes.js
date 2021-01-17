// REACT E REACT NAVIGATION IMPORTS

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// COMPONENTS

import ViewProfile from '../pages/ViewProfile';
import JobList from '../pages/JobList';

//              MEMBER LIST STACK
// MEMBER LIST E O PERFIL DO MEMBRO (QUE NAO É O LOGADO)

const JobListStack = createStackNavigator();

export default function JobListStackScreen() {
  return (
    <JobListStack.Navigator screenOptions={{ headerShown: false }}>
      <JobListStack.Screen name="JobList" component={JobList} />
      <JobListStack.Screen
        name="JobViewProfile"
        component={ViewProfile}
      />
    </JobListStack.Navigator>
  );
}
