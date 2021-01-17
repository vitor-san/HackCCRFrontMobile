/* eslint-disable no-underscore-dangle */
// REACT E REACT NATIVES IMPORTS
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Picker,
  View,
  TextInput,
  Text,
  StatusBar,
} from 'react-native';
import { CheckBox, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import AsyncStorage from '@react-native-community/async-storage';
// ESTILOS
import styles from './styles';
import globalStyles, { colors } from '../../globalStyles';

// COMPONENTES
import MemberCard from '../../components/memberCard';

// API
import api from '../../services/api';

// UTILS
import { filterMembers } from '../../utils';

export default function MemberList() {
  // NAVIGATION PROPS
  const navigation = useNavigation();

  // STATES
  const [loggedMemberId, setLoggedMemberID] = useState('');
  const [name, setName] = useState('');
  const [team, setTeam] = useState('all');
  const [checkCar, setCheckCar] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // FILTRAGEM DOS MEMBROS
  function filterMembersbyCar() {
    setCheckCar(!checkCar);
    const newData = filterMembers(allMembers, name, team, !checkCar);
    setFilteredMembers(newData);
  }

  function filterMembersbyTeam(team) {
    setTeam(team);
    const newData = filterMembers(allMembers, name, team, checkCar);
    setFilteredMembers(newData);
  }

  function filterMembersbyName(name) {
    setName(name);
    const newData = filterMembers(allMembers, name, team, checkCar);
    setFilteredMembers(newData);
  }

  // CARREGA TODOS OS MEMBROS DO BANCO
  async function loadMembers() {
    const resp = await api.get('/members', {});
    setAllMembers(resp.data);
    setFilteredMembers(resp.data);
    setLoaded(true);
  }

  useEffect(() => {
    async function getLoggedMember() {
      const resp = JSON.parse(await AsyncStorage.getItem('@CampanhaAuth:user'));
      setLoggedMemberID(resp._id);
    }
    getLoggedMember();
    loadMembers();
  }, []);

  // NAVEGA PARA A TELA DE VER O PERFIL DO MEMBRO
  function NavigateToViewProfile(member) {
    // SE O MEMBRO FOR O MEMBRO LOGADO ELE VAI PRA TELA DE PERFIL
    // DA BOTTOM TAB
    if (member._id === loggedMemberId) {
      navigation.navigate('Perfil');
    } // SENAO NAVEGA PARA A TELA DE MEMBRO DA STACK PASSANDO O ID DO MEMBRO
    else navigation.navigate('MemberViewProfile', { id: member._id });
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="light-content"
        translucent
      />
      <View>
        <StatusBar hidden={false} />
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        {/* VIEW COM LEITURA DO NOME DO MEMBRO E 
                        ICONE DE PESQUISA */}
        <ShimmerPlaceHolder
          style={styles.nameSearchPlaceholder}
          autoRun
          visible={loaded}
        >
          <View style={styles.nameSearch}>
            <TextInput
              autoCapitalize="words" // sem a primeira letra maiuscula
              placeholder="Nome do membro..."
              placeholderTextColor={colors.grey3}
              style={styles.inputText}
              onChangeText={(name) => filterMembersbyName(name)}
            />
          </View>
        </ShimmerPlaceHolder>

        {/* VIEW COM OS FILTROS DE CARRO E NÚCLEO */}
        <ShimmerPlaceHolder
          style={styles.filterPlaceholder}
          autoRun
          visible={loaded}
        >
          <View style={styles.filter}>
            <Text>Carro:</Text>
            <CheckBox
              checked={checkCar}
              center
              onPress={filterMembersbyCar}
              uncheckedColor={colors.primary}
              checkedColor={colors.primary}
            />

            <Text>Rola:</Text>
            <View style={styles.PickerView}>
              <Picker
                selectedValue={team}
                onValueChange={(itemValue) => {
                  filterMembersbyTeam(itemValue);
                }}
                style={styles.Picker}
                mode="dropdown"
              >
                <Picker.Item
                  color={colors.grey3}
                  value="all"
                  label="Núcleo..."
                />
                <Picker.Item label="Entidades" value="Entidades" />
                <Picker.Item label="Divulgação" value="Divulgação" />
                <Picker.Item label="Infra" value="Infraestrutura" />
                <Picker.Item label="RE" value="Relações Externas" />
                <Picker.Item label="Geral" value="Geral" />
              </Picker>
            </View>
          </View>
        </ShimmerPlaceHolder>
        <Divider style={styles.line} />
        <Divider style={styles.line} />
      </View>

      <View style={styles.cardsContainer}>
        <FlatList
          data={filteredMembers}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(member) => member._id}
          renderItem={({ item: member }) => (
            <MemberCard
              member={member}
              loaded={loaded}
              navigateFunction={() => NavigateToViewProfile(member)}
            />
          )}
        />
      </View>
    </View>
  );
}
