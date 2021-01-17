// REACT E REACT NAVIGATION IMPORTS
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// COMPONENTS
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import MemberList from '../pages/MemberList';
import ViewProfile from '../pages/ViewProfile';
import Dashboard from '../pages/Dashboard';
import MemberListStackScreen from './MemberList.routes';

// ESTILOS E ICONES
import globalStyles from '../globalStyles';

// BOTTOM TAB NAVIGATOR
const Tabs = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Inicio"
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
        name="Inicio"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={28} />
          ),
        }}
        component={Dashboard}
      />
      <Tabs.Screen
        name="Eventos"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar" color={color} size={28} />
          ),
        }}
        component={MemberList}
      />
      <Tabs.Screen
        name="Membros"
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Força o navegador para ir para a tela de lista de membros
            // ao invés de ir apra o topo da stack
            navigation.navigate('Membros');
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" color={color} size={28} />
          ),
        }}
        component={MemberListStackScreen}
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
