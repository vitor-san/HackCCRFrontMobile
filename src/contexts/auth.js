import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from 'react-native-flash-message';
import api from '../services/api';

import { colors } from '../globalStyles';

import { validateEmail } from '../utils';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadStoragedUserData() {
      const storagedUser = await AsyncStorage.getItem('@CampanhaAuth:user');

      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
    }
    loadStoragedUserData();
  }, []);

  async function SignIn(email, password, setLoader) {
    if (email === '' || password === '') {
      showMessage({
        message: 'Preencha Email e Senha!',
        type: 'info',
        backgroundColor: colors.red,
        position: { top: 330, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });
      return;
    }
    if (validateEmail(email) === false) {
      showMessage({
        message: 'Digite um email válido!',
        type: 'info',
        backgroundColor: colors.red,
        position: { top: 330, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });
      return;
    }

    try {
      setLoader(true);
      const resp = await api.post('/login', {
        email,
        password,
      });
      setUser(resp.data);
      await AsyncStorage.setItem(
        '@CampanhaAuth:user',
        JSON.stringify(resp.data)
      );
      setLoader(false);
    } catch (error) {
      setLoader(false);
      const { data } = error.response;
      showMessage({
        message: data.err,
        type: 'info',
        backgroundColor: colors.red,
        position: { top: 330, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });
    }
  }

  async function Logout() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, SignIn, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
