import React from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { ILLogo } from '../../assets';
import {
  Button, Gap, Input, Link,
} from '../../component';
import { Fire } from '../../config';
import {
  colors, fonts, showError, storeData, useForm,
} from '../../utils';

const Login = ({ navigation }) => {
  const [form, setForm] = useForm({ email: '', password: '' });
  const dispatch = useDispatch();
  const login = () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
    Fire.auth().signInWithEmailAndPassword(form.email, form.password).then((res) => {
      dispatch({
        type: 'SET_LOADING',
        value: false,
      });
      Fire.database().ref(`users/${res.user.uid}/`)
        .once('value')
        .then((resDB) => {
          if (resDB.val()) {
            storeData('user', resDB.val());
            navigation.replace('MainApp');
          }
        });
    })
      .catch((err) => {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showError(err.message);
      });
  };

  return (

    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={40} />
        <ILLogo />
        <Text style={styles.title}>Welcome, get started consult</Text>
        <Input
          label="Email Address"
          value={form.email}
          onChangeText={(value) => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          value={form.password}
          onChangeText={(value) => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={10} />
        <Link
          linklabel="Forgot My Password?"
          size={12}
          color={colors.link.labelprimary.text}
          fontfamily={fonts.primary[400]}
          align="right"
        />
        <Gap height={40} />
        <Button title="Sign In" onPress={login} />
        <Gap height={30} />
        <View style={styles.bottom}>
          <Link
            label="Don't have any account?"
          />
          <Link
            linklabel="Sign Up"
            size={16}
            color={colors.link.labelthird.text}
            fontfamily={fonts.primary[600]}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </ScrollView>
    </View>

  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    marginTop: 40,
    fontSize: 20,
    marginBottom: 40,
    maxWidth: 201,
  },
  labellink: {
    fontFamily: fonts.primary[600],
    marginRight: 6,
    fontSize: 16,
  },
  bottom: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
