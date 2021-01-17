// REACT E REACT NAVIGATION IMPORTS
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// COMPONENTS
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import VerifyToken from '../pages/VerifyToken';
import ResetPassword from '../pages/ResetPassword';

// AUTHENTICATION STACK
const AuthStack = createStackNavigator();

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: true }}>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <AuthStack.Screen
        options={{ headerTransparent: false, headerTitleAlign: 'center' }}
        name="Resetar Senha"
        component={ForgotPassword}
      />
      <AuthStack.Screen
        options={{
          headerTransparent: false,
          headerTitleAlign: 'center',
        }}
        name="Verificar Código"
        component={VerifyToken}
      />
      <AuthStack.Screen
        options={{ headerTransparent: false, headerTitleAlign: 'center' }}
        name="Criar Nova Senha"
        component={ResetPassword}
      />
    </AuthStack.Navigator>
  );
}
