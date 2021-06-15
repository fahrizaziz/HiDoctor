import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ILNullPhoto } from '../../assets';
import {
  Gap, Header, List, Profile,
} from '../../component';
import { Fire } from '../../config';
import { colors, getData, showError } from '../../utils';

// Kamis Lanjut
const UserProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });
  useEffect(() => {
    getData('user').then(
      (res) => {
        const data = res;
        data.photo = { uri: res.photo };
        setProfile(data);
      },
    );
  }, []);
  const signOut = () => {
    Fire.auth().signOut()
      .then(() => {
        navigation.replace('GetStarted');
      }).catch((err) => {
        showError(err.mesages);
      });
  };
  return (

    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && <Profile name={profile.fullName} job={profile.profession} photo={profile.photo} /> }

      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        warna="dark"
        col="dark"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="Available 12 languages"
        type="next"
        warna="dark"
        col="dark"
        icon="language"
      />
      <List
        name="Giev Us rate"
        desc="On Google Play Store"
        type="next"
        warna="dark"
        col="dark"
        icon="rate"
      />
      <List
        name="Help Center"
        desc="Read our guidelines"
        type="next"
        warna="dark"
        col="dark"
        icon="help"
      />
      <List
        name="Sign Out"
        desc="Sign Out Account"
        type="next"
        warna="dark"
        col="dark"
        icon="sign_out"
        onPress={signOut}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
});
