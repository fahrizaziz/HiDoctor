import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { IconRemovePhoto } from '../../../assets';
import { colors, fonts } from '../../../utils';
import { Gap } from '../../atoms';

const Profile = ({
  name, job, isRemove, photo, onPress,
}) => (
  <View style={styles.page}>
    {
      !isRemove && (
        <View style={styles.container}>
          <Image source={photo} style={styles.avatar} />
        </View>
      )
    }

    <Gap height={16} />
    {isRemove && (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={photo} style={styles.avatar} />
        {
        isRemove && <IconRemovePhoto style={styles.removePhoto} />
      }
      </TouchableOpacity>
    )}
    {
      name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.job}>{job}</Text>
        </View>
      )
    }
  </View>
);

export default Profile;

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderRadius: 130 / 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: 'center',
  },
  job: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: 'center',
  },
  removePhoto: {
    position: 'absolute',
    bottom: 10,
    top: 110,
  },
});
