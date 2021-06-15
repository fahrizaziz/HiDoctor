import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import { DummyDoctor9 } from '../../../assets';
import { colors, fonts } from '../../../utils';
import { Button } from '../../atoms';

const ChatProfile = ({
  onPress, title, desc, photo,
}) => (
  <View style={styles.container}>
    <Button type="icon-only" icon="back-light" onPress={onPress} />
    <View style={styles.content}>
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.cdoctor}>{desc}</Text>
    </View>
    <Image source={photo} style={styles.avatar} />
  </View>
);

export default ChatProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingLeft: 16,
    paddingRight: 38,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 49,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.white,
  },
  cdoctor: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.thirht,
    marginTop: 5,
    textTransform: 'capitalize',
  },
});
