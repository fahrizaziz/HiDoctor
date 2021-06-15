import React, { useState } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { IconAddPhoto, IconRemovePhoto, ILNullPhoto } from '../../assets';
import {
  Button, Gap, Header, Link,
} from '../../component';
import { Fire } from '../../config';
import {
  colors, fonts, showError, storeData,
} from '../../utils';

const UploadPhoto = ({ navigation, route }) => {
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const { fullName, profession, uid } = route.params;
  const [photoForDB, setPhotoForDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const pickCamera = () => {
    ImagePicker.launchCamera({ quality: 0.5, maxWidth: 200, maxHeight: 200 }, (response) => {
      // Same code as in above section!
      if (response.didCancel || response.error) {
        showError('opps, ga jadi ambil photo!!');
      } else {
        const source = { uri: response.uri };
        setPhotoForDB(`data:${response.type};base64, ${response.data}`);
        setPhoto(source);
        setHasPhoto(true);
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
        setPhotoForDB(`data:${response.type};base64, ${response.data}`);
        setPhoto(source);
        setHasPhoto(true);
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
  // const getImage = () => {
  //   ImagePicker.launchImageLibrary({ quality: 0.5, maxWidth: 200, maxHeight: 200 }, (response) => {
  //     // Same code as in above section!
  //     if (response.didCancel || response.error) {
  //       showError('opps, ga jadi ganti photo!!');
  //     } else {
  //       const source = { uri: response.uri };
  //       setPhotoForDB(`data:${response.type};base64, ${response.data}`);

  //       setPhoto(source);
  //       setHasPhoto(true);
  //     }
  //   });
  // };
  const uploadAndContinue = () => {
    Fire.database()
      .ref(`users/${uid}/`).update({ photo: photoForDB });
    const data = route.params;
    data.photo = photoForDB;
    storeData('user', data);
    navigation.replace('MainApp');
  };
  return (

    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarwrapper} onPress={() => bs.current.snapTo(0)}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} /> }
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} /> }
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.job}>{profession}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={uploadAndContinue}
          />
          <Gap height={30} />
          <View style={styles.link}>
            <Link
              linklabel="Skip for this"
              size={16}
              color={colors.link.labelthird.text}
              fontfamily={fonts.primary[400]}
              onPress={() => navigation.replace('MainApp')}
            />
          </View>
        </View>
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
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
  },
  avatarwrapper: {
    height: 130,
    width: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    top: 100,
  },
  name: {
    fontSize: 24,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: 11,
  },
  job: {
    fontSize: 18,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 4,
  },
  link: {
    alignItems: 'center',
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
