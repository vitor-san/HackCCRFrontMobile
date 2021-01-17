// REACT E REACT NAVIGATION IMPORTS
import React from 'react';

import { useAuth } from '../contexts/auth';

// COMPONENTS
import AuthStack from './Auth.routes';
import MainStack from './Main.routes';

export default function Routes() {
  const { signed } = useAuth();

  return signed ? <MainStack /> : <AuthStack />;
}
