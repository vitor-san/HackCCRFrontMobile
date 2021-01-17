/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  Modal,
  ImageBackground,
  ActivityIndicator,
  Image,
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { colors } from '../globalStyles';

// ICONS
import personIcon from '../assets/Icons/person.png';

const { height, width } = Dimensions.get('window');

export default function ViewImageModal({ visible, image, cancel, name }) {
  const [loading, setLoading] = useState(image !== 'none');

  function starts() {
    setLoading(image !== 'none');
  }

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={cancel}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={cancel}
      >
        <TouchableWithoutFeedback>
          {/* TouchableWithoutFeedback MUST have ONLY ONE child component */}
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <ImageBackground
                style={styles.standartAvatar}
                source={personIcon}
              >
                <Image
                  onLoadStart={starts}
                  onLoadEnd={() => setLoading(false)}
                  style={styles.avatar}
                  source={{ uri: image }}
                />
              </ImageBackground>
            </View>

            <ActivityIndicator
              style={styles.activityIndicator}
              animating={loading}
              size="large"
            />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height, // ALL height
    width, // ALL width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  infoContainer: {
    width: '90%',
    height: '45%',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: colors.grey1,
    color: colors.white,
    height: '10%',
    textAlign: 'center',
    paddingTop: '1.5%',
    fontSize: 18,
  },
  standartAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  avatar: {
    height: '100%',
    resizeMode: 'stretch',
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
