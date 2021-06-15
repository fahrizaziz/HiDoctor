import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';

const ProfileItem = ({ label, detail }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.detail}>{detail}</Text>
  </View>
);

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border2,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
  },
  detail: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
    marginTop: 6,
  },
});
