import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { colors, fonts } from '../../../utils';

const Link = ({
  linklabel, size, label, color, fontfamily, align, onPress,
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.link(size, color, fontfamily, align)}>
      {linklabel}
    </Text>
  </TouchableOpacity>
);

export default Link;

const styles = StyleSheet.create({
  link: (size, color, fontfamily, align) => ({
    fontSize: size,
    fontFamily: fontfamily,
    color,
    textAlign: align,
    textDecorationLine: 'underline',
  }),
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  label: {
    fontFamily: fonts.primary[400],
    marginRight: 6,
    fontSize: 16,
    color: colors.link.labelsecondart.text,
  },
});
