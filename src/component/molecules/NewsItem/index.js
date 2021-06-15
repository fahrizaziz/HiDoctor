import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import { colors, fonts } from '../../../utils';

const NewsItem = ({ title, date, image }) => (
  <View style={styles.container}>
    <View style={styles.titlewrap}>
      <Text style={styles.titlenews}>
        {title}
      </Text>
      <Text style={styles.newsday}>{date}</Text>
    </View>
    <Image source={{ uri: image }} style={styles.newsavatar} />
  </View>
);

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border2,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  titlewrap: {
    flex: 1,
  },
  newsavatar: {
    borderRadius: 11,
    width: 80,
    height: 60,
  },
  titlenews: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.white,
    maxWidth: '90%',
  },
  newsday: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.thirht,
    marginTop: 4,
  },
});
