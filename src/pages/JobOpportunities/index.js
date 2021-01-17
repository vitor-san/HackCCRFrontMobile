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
import JobCard from '../../components/JobCard';

// API
import api from '../../services/api';

// UTILS
import { filterJobs } from '../../utils';

export default function JobList() {
  // NAVIGATION PROPS
  const navigation = useNavigation();

  // STATES
  const [name, setName] = useState('');
  const [team, setTeam] = useState('all');
  const [checkCar, setCheckCar] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // FILTRAGEM DOS MEMBROS
  function filterJobsByEnterprise() {
    setCheckCar(!checkCar);
    const newData = filterJobs(allJobs, name, team, !checkCar);
    setFilteredJobs(newData);
  }

  function filterJobsbyTeam(team) {
    setTeam(team);
    const newData = filterJobs(allJobs, name, team, checkCar);
    setFilteredJobs(newData);
  }

  function filterJobsbyName(name) {
    setName(name);
    const newData = filterJobs(allJobs, name, team, checkCar);
    setFilteredJobs(newData);
  }

  // CARREGA TODOS OS MEMBROS DO BANCO
  async function loadJobs() {
    const resp = await api.get('/Jobs', {});
    setAllJobs(resp.data);
    setFilteredJobs(resp.data);
    setLoaded(true);
  }

  useEffect(() => {
    async function getLoggedJob() {
      const resp = JSON.parse(await AsyncStorage.getItem('@CampanhaAuth:user'));
      setLoggedJobID(resp._id);
    }
    getLoggedJob();
    loadJobs();
  }, []);

  // NAVEGA PARA A TELA DE VER O PERFIL DO MEMBRO
  function NavigateToViewProfile(job) {
    // SE O MEMBRO FOR O MEMBRO LOGADO ELE VAI PRA TELA DE PERFIL
    // DA BOTTOM TAB
    if (job._id === loggedJobId) {
      navigation.navigate('Perfil');
    } // SENAO NAVEGA PARA A TELA DE MEMBRO DA STACK PASSANDO O ID DO MEMBRO
    else navigation.navigate('JobViewProfile', { id: job._id });
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
              onChangeText={(name) => filterJobsbyName(name)}
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
              onPress={filterJobsbyCar}
              uncheckedColor={colors.primary}
              checkedColor={colors.primary}
            />

            <Text>Rola:</Text>
            <View style={styles.PickerView}>
              <Picker
                selectedValue={team}
                onValueChange={(itemValue) => {
                  filterJobsbyTeam(itemValue);
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
          data={filteredJobs}
          vertical
          showsVerticalScrollIndicator={false}
          keyExtractor={(job) => job._id}
          renderItem={({ item: job }) => (
            <JobCard
              job={job}
              loaded={loaded}
              navigateFunction={() => NavigateToViewProfile(job)}
            />
          )}
        />
      </View>
    </View>
  );
}
