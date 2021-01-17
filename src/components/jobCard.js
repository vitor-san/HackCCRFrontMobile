import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import { Avatar } from 'react-native-elements';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import styles from '../pages/JobOpportunities/styles';
import { colors } from '../globalStyles';

function JobCard({ job, loaded, navigateFunction }) {
  const [ViewImageVisible, setViewImageVisible] = useState(false);

  return (
    <ShimmerPlaceHolder
      style={{ height: 120, width: '100%', marginTop: 10, borderRadius: 6 }}
      autoRun
      visible={loaded}
    >
      <TouchableOpacity style={styles.card} onPress={navigateFunction}>
        <Avatar
          size="large"
          rounded
          title={job.name.slice(0, 2)}
          onPress={() => setViewImageVisible(true)}
          activeOpacity={0.8}
          source={{ uri: job.image ? job.image.url : 'none' }}
        />

        <View style={styles.jobInfo}>
          <View>
            <Text style={styles.nickname}>{job.realName}</Text>
            <Text style={styles.name}>{job.name}</Text>
          </View>
          <Text style={styles.team}>{job.team.name}</Text>
        </View>
        <View style={styles.iconsInfo}>
          <FontAwesome5
            name="crown"
            color={job.coord === true ? colors.primary : colors.white}
            size={28}
          />
          <MaterialIcons
            name="directions-car"
            color={job.hasCar === 1 ? colors.primary : colors.white}
            size={32}
          />
        </View>
      </TouchableOpacity>
    </ShimmerPlaceHolder>
  );
}

export default React.memo(JobCard);
