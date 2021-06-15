import React from 'react';
import {
  StyleSheet, Text, View, ImageBackground,
} from 'react-native';
import { ILLogo, ILGetStarted } from '../../assets';
import { Button, Gap } from '../../component';
import { colors, fonts } from '../../utils';

const GetStarted = ({ navigation }) => (

  <ImageBackground source={ILGetStarted} style={styles.page}>
    <View>
      <ILLogo />
      <Text style={styles.title}>
        Consultation with doctor so over easy & flexible
      </Text>
    </View>
    <View>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('SignUp')}
      />
      <Gap height={16} />
      <Button
        title="Sign In"
        type="secondary"
        onPress={() => navigation.replace('Login')}
      />
    </View>
  </ImageBackground>
);

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginTop: 91,
    color: colors.white,
    fontFamily: fonts.primary[600],
  },
});
