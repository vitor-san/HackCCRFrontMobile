import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import FlashMessage from 'react-native-flash-message';
import Routes from './src/routes/index';

import { AuthProvider } from './src/contexts/auth';

// COMPONENT DE FLASH MESSAGE

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <FlashMessage
        position={{ bottom: 70, left: 20, right: 20 }}
        animated
        floating
      />
    </NavigationContainer>
  );
}
