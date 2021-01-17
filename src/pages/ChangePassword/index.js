import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LoaderModal from '../../modals/loaderModal';

import styles from './styles';
import globalStyles, { colors } from '../../globalStyles';

// UTILS
import { checkSpace } from '../../utils';

// API
import api from '../../services/api';

const { height, width } = Dimensions.get('window');

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [id, setId] = useState('');

  const [loaderVisible, setLoaderVisible] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const { memberId: ID } = route.params;
    setId(ID);
  }, []);

  function passwordView() {
    if (showPassword === false) {
      setShowPassword(true);
      setSecurePassword(false);
    } else {
      setShowPassword(false);
      setSecurePassword(true);
    }
  }

  async function savePassword() {
    if (
      currentPassword === '' ||
      checkSpace(currentPassword) === true ||
      newPassword === '' ||
      checkSpace(newPassword2) === true ||
      newPassword2 === '' ||
      checkSpace(newPassword2) === true
    ) {
      showMessage({
        message: 'Por favor, preencha todos os campos!',
        type: 'info',
        backgroundColor: colors.red,
        position: { top: 330, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });
      return;
    }
    if (newPassword !== newPassword2) {
      showMessage({
        message: 'Por favor, repita corretamente a nova senha!',
        type: 'info',
        backgroundColor: colors.red,
        position: { top: 330, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });
      return;
    }
    try {
      setLoaderVisible(true);
      const resp = await api.put(`/members/${id}/password/`, {
        currentPassword,
        newPassword,
      });
      showMessage({
        message: resp.data.message,
        type: 'info',
        backgroundColor: colors.green,
        position: { top: 330, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });
      setLoaderVisible(false);
      navigation.navigate('BottomTab', {
        screen: 'Perfil',
      });
    } catch (error) {
      setLoaderVisible(false);
      const { data } = error.response;
      console.log(data);
      showMessage({
        message: data.message,
        type: 'info',
        backgroundColor: colors.red,
        position: { top: 330, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });
    }
  }

  return (
    <View style={globalStyles.authContainer}>
      <LoaderModal visible={loaderVisible} text="Salvando as informações..." />
      <View style={globalStyles.input}>
        <TextInput
          style={{ width: '90%' }}
          secureTextEntry={securePassword}
          placeholder="Digite sua senha atual"
          autoCapitalize="none"
          keyboardType="default"
          value={currentPassword}
          onChangeText={(currentPassword) =>
            setCurrentPassword(currentPassword)
          }
        />
        <TouchableOpacity onPress={passwordView} style={globalStyles.inputIcon}>
          <MaterialCommunityIcons
            name={showPassword === false ? 'eye' : 'eye-off'}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...globalStyles.input,
          marginTop: 20,
        }}
      >
        <TextInput
          style={{ width: '90%' }}
          secureTextEntry={securePassword}
          placeholder="Digite sua nova senha"
          autoCapitalize="none"
          keyboardType="default"
          value={newPassword}
          onChangeText={(newPassword) => setNewPassword(newPassword)}
        />
        <TouchableOpacity onPress={passwordView} style={globalStyles.inputIcon}>
          <MaterialCommunityIcons
            name={showPassword === false ? 'eye' : 'eye-off'}
            size={20}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...globalStyles.input,
          marginTop: 20,
        }}
      >
        <TextInput
          style={{ width: '90%' }}
          secureTextEntry={securePassword}
          placeholder="Digite sua nova senha novamente"
          autoCapitalize="none"
          keyboardType="default"
          value={newPassword2}
          onChangeText={(newPassword2) => setNewPassword2(newPassword2)}
        />
        <TouchableOpacity onPress={passwordView} style={globalStyles.inputIcon}>
          <MaterialCommunityIcons
            name={showPassword === false ? 'eye' : 'eye-off'}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsView}>
        <TouchableOpacity
          onPress={savePassword}
          style={globalStyles.successButton}
        >
          <Text style={globalStyles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={globalStyles.errorButton}
        >
          <Text style={globalStyles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
