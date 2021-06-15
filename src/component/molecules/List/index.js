import React from 'react';
import {
  Image, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import {
  IconEditProfile, IconLanguage, IconNext, IconRate, IconHelp, IconSignOut,
} from '../../../assets';
import { colors, fonts } from '../../../utils';

const List = ({
  profile, name, desc, warna, col, type, onPress, icon,
}) => {
  const Icon = () => {
    if (icon === 'edit-profile') {
      return <IconEditProfile />;
    }
    if (icon === 'language') {
      return <IconLanguage />;
    }
    if (icon === 'rate') {
      return <IconRate />;
    }
    if (icon === 'help') {
      return <IconHelp />;
    }
    if (icon === 'sign_out') {
      return <IconSignOut />;
    }
    return <IconEditProfile />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {
        icon ? <Icon /> : <Image source={profile} style={styles.avatar} />
      }
      <View style={styles.content}>
        <Text style={styles.name(warna)}>{name}</Text>
        <Text style={styles.lastmessage(col)}>{desc}</Text>
      </View>
      {
      type === 'next' && <IconNext />
    }
    </TouchableOpacity>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  name: (warna) => ({
    fontSize: 16,
    color: warna === 'dark' ? colors.primary : colors.white,
    fontFamily: fonts.primary[400],
  }),
  lastmessage: (col) => ({
    fontFamily: fonts.primary[300],
    fontSize: 12,
    color: col === 'dark' ? colors.text.secondary : colors.text.thirht,
    textTransform: 'capitalize',
  }),
});
