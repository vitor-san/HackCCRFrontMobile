/* eslint-disable no-use-before-define */
import React from 'react';
import {
  Modal,
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

// ICONS
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { colors } from '../globalStyles';

const { height, width } = Dimensions.get('window');

export default function ImagePickerModal({
  visible,
  openCamera,
  openGallery,
  deleteImage,
  cancel,
}) {
  return (
    <Modal
      statusBarTranslucent
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={cancel}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={cancel}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ ...styles.button }}
              onPress={deleteImage}
            >
              <FontAwesome name="trash" size={36} color="red" />
              <Text style={{ ...styles.labelText, color: 'red' }}>
                Remover Foto
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.button}
              onPress={openCamera}
            >
              <FontAwesome5 name="camera" size={28} color={colors.primary} />
              <Text style={styles.labelText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openGallery}>
              <FontAwesome name="image" size={28} color={colors.primary} />
              <Text style={styles.labelText}>Galeria</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: colors.transBlack,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: colors.white,
    paddingTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
    height: 0.07 * height,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    padding: 0.05 * width,
  },
  labelText: {
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: '500',
    color: colors.primary,
  },
});
