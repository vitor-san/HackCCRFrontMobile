import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

import { useAuth } from '../../contexts/auth';

import { colors } from '../../globalStyles';

export default function Dashboard() {
  const { Logout } = useAuth();

  function handleLogout() {
    Logout();
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="light-content"
        translucent
      />
      <View>
        <StatusBar hidden={false} />
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
