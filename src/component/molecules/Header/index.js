import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';
import { Button, Gap } from '../../atoms';
import ChatProfile from './ChatProfile';

const Header = ({
  onPress, title, type, photo, desc,
}) => {
  if (type === 'chat-profile') {
    return (
      <ChatProfile
        onPress={onPress}
        title={title}
        desc={desc}
        photo={photo}
      />
    );
  }
  return (
    <View style={styles.container(type)}>
      <Button type="icon-only" icon={type === 'dark' ? 'back-light' : 'back-dark'} onPress={onPress} />
      <Text style={styles.textcontainer(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: (type) => ({
    paddingHorizontal: 16,
    paddingVertical: type === 'dark' ? 16 : 30,
    backgroundColor: type === 'dark' ? colors.primary : colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    height: type === 'dark' ? 50 : 80,
    borderBottomLeftRadius: type === 'dark' ? 16 : 0,
    borderBottomRightRadius: type === 'dark' ? 16 : 0,
  }),
  textcontainer: (type) => ({
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: type === 'dark' ? colors.white : colors.text.primary,
    textTransform: 'capitalize',
  }),
});
