import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { showMessage } from 'react-native-flash-message';

import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import globalStyles, { colors } from '../../globalStyles';

// UTILS
import { checkSpace } from '../../utils';

const { height, width } = Dimensions.get('window');

export default function ForgotPassword() {
  const [token, setToken] = useState('');

  const route = useRoute();
  const navigation = useNavigation();

  const [id, setId] = useState('');

  useEffect(() => {
    const { memberId: ID } = route.params;
    setId(ID);
  }, []);

  function resetPassword() {
    if (token === '' || checkSpace(token) === true) {
      showMessage({
        message:
          'Por favor, preencha o campo designado\nOU\nVerifique se há espaços em branco no codígo!',
        type: 'info',
        backgroundColor: colors.red,
        position: { top: 330, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });
      return;
    }
    navigation.navigate('Criar Nova Senha', { token, memberId: id });
  }
  return (
    <View style={globalStyles.authContainer}>
      <View style={styles.emailContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Cole aqui o token recebido"
          autoCapitalize="none"
          keyboardType="default"
          value={token}
          onChangeText={(token) => setToken(token)}
        />
        <TouchableOpacity
          onPress={resetPassword}
          style={globalStyles.successButton}
        >
          <Text style={globalStyles.buttonText}>Criar Nova Senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.failedButton}>
        <Text style={styles.text}>Não recebeu o código?</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.errorButton}
        >
          <Text style={globalStyles.buttonText}>
            Reenviar Código de Segurança
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
