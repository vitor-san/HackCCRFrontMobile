// REACT E REACT NAVIGATION IMPORTS
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import JobList from '../pages/JobList';
import ViewProfile from '../pages/ViewProfile';
import Trail from '../pages/Trail';
import JobListStackScreen from './JobList.routes';

// ESTILOS E ICONES
import globalStyles from '../globalStyles';

// BOTTOM TAB NAVIGATOR
const Tabs = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="Trilhas"
      tabBarOptions={{
        style: globalStyles.footer,
        labelStyle: globalStyles.footerText,
        activeTintColor: '#FFF',
        activeBackgroundColor: '#003D5C',
        inactiveTintColor: '#003D5C',
        inactiveBackgroundColor: '#FFF',
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Trilhas"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={28} />
          ),
        }}
        component={Trail}
      />
      <Tabs.Screen
        name="Eventos"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar" color={color} size={28} />
          ),
        }}
        component={JobList}
      />
      <Tabs.Screen
        name="Vagas"
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Força o navegador para ir para a tela de lista de Vagas
            // ao invés de ir apra o topo da stack
            navigation.navigate('Vagas');
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" color={color} size={28} />
          ),
        }}
        component={JobListStackScreen}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={28} />
          ),
        }}
        component={ViewProfile}
      />
    </Tabs.Navigator>
  );
}
