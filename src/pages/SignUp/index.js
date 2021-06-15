import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import {
  Button, Gap, Header, Input,
} from '../../component';
import { Fire } from '../../config';
import {
  colors, showError, storeData, useForm,
} from '../../utils';

// Rehat dulu
const SignUp = ({ navigation }) => {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const onContinue = () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        setForm('reset');
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid,
        };
        Fire.database()
          .ref(`users/${success.user.uid}/`).set(data);
        storeData('user', data);
        navigation.navigate('UploadPhoto', data);
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
      <Header onPress={() => navigation.goBack()} title="Sign Up" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={(value) => setForm('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Profession"
            value={form.profession}
            onChangeText={(value) => setForm('profession', value)}
          />
          <Gap height={24} />
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
          <Gap height={40} />
          <Button
            title="Continue"
            onPress={onContinue}
          />
        </ScrollView>
      </View>
    </View>

  );
};

export default SignUp;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
