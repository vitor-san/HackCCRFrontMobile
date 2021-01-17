/* eslint-disable no-underscore-dangle */
// REACT E REACT NATIVES IMPORTS
import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

// ICONS
import { MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import carIcon from '../../assets/Icons/Car.png';
import notCarIcon from '../../assets/Icons/notCar.png';

// ESTILOS
import styles from './styles';
import globalStyles, { colors } from '../../globalStyles';

// COMPONENTES
import ShowCrown from '../../components/showCrown';
import ShowEditSave from '../../components/showEditSave';
import TeamIcon from '../../components/TeamIcon';
import ImagePickerModal from '../../modals/imagePickerModal';
import LoaderModal from '../../modals/loaderModal';

// API
import api from '../../services/api';

// UTILS
import { validateEmail, validateWhatsApp } from '../../utils';

export default function EditProfile() {
  // NAVIGATION PROPS
  const route = useRoute();
  const navigation = useNavigation();
  const { member } = route.params; // ID DO MEMBRO DO PERFIL

  // STATES
  const [name, setName] = useState(member.name);
  const [nickname, setNickName] = useState(member.realName);
  const [email, setEmail] = useState(member.email);
  const [course, setCourse] = useState(member.course);
  const [wpp, setWpp] = useState(member.wpp);
  const [hasCar, setHasCar] = useState(member.hasCar);
  const [photo, setPhoto] = useState(member.image ? member.image : 'none');
  const [deleteImage, setDeleteImage] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);

  // FUNCTIONS
  function Cancel() {
    navigation.goBack();
  }

  async function saveMemberStorage() {
    try {
      const resp = await api.get(`/members/${member._id}`, {});
      await AsyncStorage.setItem(
        '@CampanhaAuth:user',
        JSON.stringify(resp.data)
      );
    } catch (error) {
      const { data } = error.response;
      console.log(data);
    }
  }

  // MANDA AS INFORMAÇÕES PARA O BANCO
  async function saveInformations() {
    if (validateEmail(email) === false) {
      return;
    }
    if (validateWhatsApp(wpp) === false) {
      return;
    }
    const data = new FormData();
    data.append('name', name);
    data.append('realName', nickname);
    data.append('email', email);
    data.append('wpp', wpp);
    data.append('team', member.team._id);
    data.append('course', course);
    data.append('coord', member.coord);
    data.append('hasCar', hasCar);

    if (deleteImage === true) {
      data.append('deleteImage', true);
    } else if (photo !== 'none' && photo.uri) {
      photo.type = 'image';
      const fileName = photo.uri.split('/').pop();
      const ext = photo.uri.split('.').pop();
      data.append('image', {
        uri: photo.uri,
        name: fileName,
        type: `${photo.type}/${ext}`,
      });
    }

    try {
      setLoaderVisible(true);
      await api.put(`/members/${member._id}`, data);
      await saveMemberStorage();

      // reseta a pagina de perfil
      // ainda não entendi como funciona direito
      navigation.reset({
        index: 0,
        routes: [{ name: 'Perfil' }],
      });
      setLoaderVisible(false);
      // Navega para a tela de perfil da BottomTab
      navigation.navigate('BottomTab', {
        screen: 'Perfil',
      });
      showMessage({
        message: 'Informações salvas com sucesso!',
        type: 'info',
        backgroundColor: colors.green,
        position: { top: 70, left: 20, right: 20 },
        style: { alignItems: 'center' },
      });
    } catch (error) {
      setLoaderVisible(false);
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
  function DeleteImage() {
    setDeleteImage(true);
    setCameraModalVisible(false);
    setPhoto('none');
  }

  async function openGallery() {
    setCameraModalVisible(false);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.cancelled) {
        setPhoto(result);
        setDeleteImage(false);
      }
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

  // ABRE A CAMERA DO CELULAR
  async function openCamera() {
    setCameraModalVisible(false);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.cancelled) {
        setPhoto(result);
        setDeleteImage(false);
      }
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
    <View style={globalStyles.container}>
      {/* MODALS */}
      {/* IMAGE PICKER */}
      <ImagePickerModal
        visible={cameraModalVisible}
        cancel={() => setCameraModalVisible(false)}
        save={() => setCameraModalVisible(false)}
        openCamera={openCamera}
        openGallery={openGallery}
        deleteImage={DeleteImage}
      />
      <LoaderModal visible={loaderVisible} text="Salvando as informações..." />
      <View style={styles.profileContainer}>
        {/* Parte com o botão de editar e a foto */}

        <View style={styles.photographyContainer}>
          <View style={styles.editButtonContainer}>
            <TouchableOpacity onPress={Cancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <View style={styles.photoContainer}>
              <View style={styles.photo}>
                <ShowCrown show={member.coord} />
                <Avatar
                  containerStyle={styles.standartAvatar}
                  size="large"
                  rounded
                  activeOpacity={0.2}
                  title={member.name ? member.name.slice(0, 2) : 'UN'}
                  source={{
                    // eslint-disable-next-line no-nested-ternary
                    uri: photo.url ? photo.url : photo.uri ? photo.uri : 'none',
                  }}
                />
              </View>
              <View style={styles.cameraContainer}>
                <TouchableOpacity
                  onPress={() => setCameraModalVisible(true)}
                  style={styles.camera}
                >
                  <MaterialIcons
                    name="photo-camera"
                    color="#003D5C"
                    size={32}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <ShowEditSave onPress={saveInformations} type="save" show />
          </View>
        </View>

        {/* Informações do membro */}

        <View styles={styles.infoContainer}>
          <View style={styles.names}>
            <View style={styles.nameBox}>
              <TextInput
                style={styles.nameInput}
                autoCapitalize="words"
                multiline
                value={name}
                onChangeText={(name) => setName(name)}
              />
            </View>
            <View style={styles.nameBox}>
              <TextInput
                style={styles.nameInput}
                autoCapitalize="words"
                multiline
                value={nickname}
                onChangeText={(nickname) => setNickName(nickname)}
              />
            </View>
          </View>

          <View style={styles.informations}>
            <View style={styles.iconTextContainer}>
              <Feather name="mail" color="#003D5C" size={29} />
              <View style={styles.infoBox}>
                <TextInput
                  style={styles.infoInput}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={styles.iconTextContainer}>
              <MaterialIcons name="school" color="#003D5C" size={29} />

              <View style={styles.infoBox}>
                <TextInput
                  style={styles.infoInput}
                  value={course}
                  onChangeText={(course) => setCourse(course)}
                />
              </View>
            </View>
            <View style={styles.iconTextContainer}>
              <FontAwesome name="whatsapp" color="#003D5C" size={34} />
              <View style={styles.infoBox}>
                <TextInput
                  style={styles.infoInput}
                  keyboardType="phone-pad"
                  value={wpp}
                  onChangeText={(wpp) => setWpp(wpp)}
                />
              </View>
            </View>
          </View>

          <View style={styles.carTeamContainer}>
            <TouchableOpacity
              style={styles.carTeamButton}
              onPress={() => setHasCar(hasCar === 0 ? 1 : 0)}
            >
              <Image
                style={styles.car}
                source={hasCar === 0 ? notCarIcon : carIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.carTeamButton}>
              <TeamIcon color="#003D5C" size={22} team={member.team.name} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
