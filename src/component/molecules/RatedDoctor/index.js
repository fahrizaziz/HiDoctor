import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { IconStar } from '../../../assets';
import { colors, fonts } from '../../../utils';

const RetedDoctor = ({
  onPress, name, desc, avatar,
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image source={avatar} style={styles.avatar} />
    <View style={styles.titleheader}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.doctor}>{desc}</Text>
    </View>
    <View style={styles.rate}>
      <IconStar />
      <IconStar />
      <IconStar />
      <IconStar />
      <IconStar />
    </View>
  </TouchableOpacity>
);

export default RetedDoctor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardLight,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
    height: 66,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 59,
    height: 59,
    borderRadius: 59 / 2,
    marginLeft: 24,
    marginVertical: 3,
  },
  titleheader: {
    marginLeft: 7,
    paddingVertical: 13,
    flex: 1,
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  doctor: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
  },
});
