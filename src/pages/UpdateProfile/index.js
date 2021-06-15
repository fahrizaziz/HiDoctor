import React, { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { ILNullPhoto } from '../../assets';
import {
  Button, Gap, Header, Input, Profile,
} from '../../component';
import { Fire } from '../../config';
import {
  colors, fonts, getData, showError, storeData,
} from '../../utils';

const UpdateProfile = ({ navigation }) => {
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
    photoForDB: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  // const [photoForDB, setPhotoForDB] = useState('');
  const pickCamera = () => {
    ImagePicker.launchCamera({ quality: 0.5, maxWidth: 200, maxHeight: 200 }, (response) => {
      // Same code as in above section!
      if (response.didCancel || response.error) {
        showError('opps, ga jadi ambil photo!!');
      } else {
        const source = { uri: response.uri };
        setProfile({
          ...profile,
          photoForDB: `data:${response.type};base64, ${response.data}`,
        });
        setPhoto(source);
      }
    });
    bs.current.snapTo(1);
  };
  const pickLibary = () => {
    ImagePicker.launchImageLibrary({ quality: 0.5, maxWidth: 200, maxHeight: 200 }, (response) => {
      // Same code as in above section!
      if (response.didCancel || response.error) {
        showError('opps, ga jadi pilih photo!!');
      } else {
        const source = { uri: response.uri };
        setProfile({
          ...profile,
          photoForDB: `data:${response.type};base64, ${response.data}`,
        });
        setPhoto(source);
      }
    });
    bs.current.snapTo(1);
  };
  const renderInner = () => (
    <View style={styles.panel}>

      <Text style={styles.panelTitle}>Upload Photo</Text>
      <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>

      <TouchableOpacity style={styles.panelButton} onPress={pickCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickLibary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>

    </View>
  );
  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setPhoto(tempPhoto);
      setProfile(data);
    });
  }, []);
  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password kurang dari 6 karater');
      } else {
        updatePassword();
        updateProfileData();
      }
    } else {
      updateProfileData();
    }
  };
  const updatePassword = () => {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        user.updatePassword(password)
          .catch((err) => {
            showError(err.message);
          });
      }
    });
  };
  const updateProfileData = () => {
    const data = profile;
    data.photo = profile.photoForDB;
    delete data.photoForDB;
    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        storeData('user', data)
          .then(() => {
            navigation.replace('MainApp');
          })
          .catch(() => {
            showError('Terjadi Masalah');
          });
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };
  // const getImage = () => {
  //   ImagePicker.launchImageLibrary({ quality: 0.5, maxWidth: 200, maxHeight: 200 }, (response) => {
  //     // Same code as in above section!
  //     if (response.didCancel || response.error) {
  //       showError('opps, ga jadi ganti photo!!');
  //     } else {
  //       const source = { uri: response.uri };
  //       setPhotoForDB(`data:${response.type};base64, ${response.data}`);

  //       setPhoto(source);
  //     }
  //   });
  // };
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={() => bs.current.snapTo(0)} />
          <Gap height={16} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText('fullName', value)}

          />
          <Gap height={24} />
          <Input
            label="Profesion"
            value={profile.profession}
            onChangeText={(value) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input
            label="Email Address"
            value={profile.email}
            disable
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button
            title="Save Profile"
            onPress={update}
          />
        </View>

        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction
          renderContent={renderInner}
          renderHeader={renderHeader}
        />
      </ScrollView>

    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
  header: {
    backgroundColor: colors.primary,
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: colors.primary,
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    fontFamily: fonts.primary[700],
    color: colors.white,
  },
  panelSubtitle: {
    fontSize: 14,
    color: colors.button.disable.text,
    height: 30,
    marginBottom: 10,
    fontFamily: fonts.primary[600],
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FF6347',
  },
});
