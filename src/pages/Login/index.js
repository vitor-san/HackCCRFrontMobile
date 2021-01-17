import React, { useState, useEffect } from 'react';

import {
  Animated,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LoaderModal from '../../modals/loaderModal';

import Logo from '../../assets/Logo/Logo.png';

import styles from './styles';
import globalStyles, { colors } from '../../globalStyles';

import {
  ShowUpAnimation,
  keyboardDidHideAnimation,
  keyboardDidShowAnimation,
} from './Animations';

// CONTEXTS
import { useAuth } from '../../contexts/auth';

const { height, width } = Dimensions.get('window');

export default function Login() {
  const { SignIn } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  function passwordView() {
    if (showPassword === false) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  }

  // ANIMATIONS PROPS
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: height * 0.2 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: width, y: height * 0.2 }));
  const [loaderVisible, setLoaderVisible] = useState(false);

  // NAVIGATION PROPS
  const navigation = useNavigation();

  // STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    SignIn(email, password, setLoaderVisible);
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      // eslint-disable-next-line no-use-before-define
      keyboardDidShow
    );
    // eslint-disable-next-line no-undef
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      // eslint-disable-next-line no-use-before-define
      keyboardDidHide
    );

    ShowUpAnimation(offset, opacity);

    return function cleanup() {
      // eslint-disable-next-line no-undef
      keyboardDidShowListener.remove();
      // eslint-disable-next-line no-undef
      keyboardDidHideListener.remove();
    };
  }, []);

  function keyboardDidShow() {
    keyboardDidShowAnimation(logo, offset);
  }

  function keyboardDidHide() {
    keyboardDidHideAnimation(logo, offset);
  }

  function forgotPassword() {
    navigation.navigate('Resetar Senha');
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="light-content"
        translucent
      />
      <View>
        <StatusBar hidden={false} />
      </View>
      <LoaderModal visible={loaderVisible} />
      <View>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
            opacity,
          }}
          resizeMode="contain"
          source={Logo}
        />
      </View>

      <Animated.View
        style={
          ([styles.content],
          {
            opacity,
            transform: [{ translateY: offset.y }],
          })
        }
      >
        <TextInput
          style={{ ...globalStyles.input, marginTop: height * 0.01 }}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <View
          style={{
            ...globalStyles.input,
            marginTop: height * 0.03,
          }}
        >
          <TextInput
            style={{ width: '90%' }}
            placeholder="Senha"
            secureTextEntry={showPassword}
            autoCapitalize="none" // sem a primeira letra maiuscula
            autoCorrect={false}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity
            onPress={passwordView}
            style={globalStyles.inputIcon}
          >
            <MaterialCommunityIcons
              name={showPassword === false ? 'eye' : 'eye-off'}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={forgotPassword}>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={globalStyles.successButton}
          >
            <Text style={{ ...globalStyles.buttonText, fontSize: 18 }}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
