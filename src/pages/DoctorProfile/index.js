import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Button, Gap, Header, Profile, ProfileItem,
} from '../../component';
import { colors } from '../../utils';

const DoctorProfile = ({ navigation, route }) => {
  const dataDoctor = route.params;

  return (

    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile
        name={dataDoctor.data.fullName}
        job={dataDoctor.data.profession}
        photo={{ uri: dataDoctor.data.photo }}
      />
      <Gap height={10} />
      <ProfileItem
        label="Graduates"
        detail={dataDoctor.data.university}
      />
      <ProfileItem
        label="Practice Place"
        detail={dataDoctor.data.hospital_address}
      />
      <ProfileItem
        label="No. STR"
        detail={dataDoctor.data.str_number}
      />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chatting', dataDoctor)}
        />
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
