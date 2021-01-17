import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import globalStyles, { colors } from '../../globalStyles';

// API
import api from '../../services/api';

// UTILS
import { validateEmail, checkSpace } from '../../utils';

const { height, width } = Dimensions.get('window');

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  async function sendToken() {
    if (email === '' || checkSpace(email) === true) {
      showMessage({
        message: 'Por favor, preencha o campo designado!',
        type: 'info',
        backgroundColor: colors.red,
        position: { top: 330, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });
      return;
    }

    if (validateEmail(email) === false) {
      return;
    }
    try {
      const resp = await api.post('/token', {
        email,
      });
      const { id } = resp.data;
      showMessage({
        message: resp.data.message,
        type: 'info',
        backgroundColor: colors.green,
        position: { top: 330, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });

      navigation.navigate('Verificar Código', { memberId: id });
    } catch (error) {
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

  return (
    <View style={globalStyles.authContainer}>
      <TextInput
        style={globalStyles.input}
        placeholder="Digite seu Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TouchableOpacity
        onPress={sendToken}
        style={{
          ...globalStyles.successButton,
        }}
      >
        <Text style={globalStyles.buttonText}>Enviar Código de Segurança</Text>
      </TouchableOpacity>
    </View>
  );
}
