import React from 'react';
import {
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { colors, fonts } from '../../../utils';
import { Button } from '../../atoms';

const InputChat = ({ value, onChangeText, onButtonPress }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Tulisan pesan untuk Nairobi"
      value={value}
      onChangeText={onChangeText}
    />
    <Button
      disable={value.length < 1}
      type="btn-icon-send"
      onPress={onButtonPress}
    />
  </View>
);

export default InputChat;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontFamily: fonts.primary[400],
    fontSize: 14,
    maxHeight: 45,
  },
});
