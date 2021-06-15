import React, { useEffect, useState } from 'react';
import {
  ImageBackground, StyleSheet, Text, View,
} from 'react-native';
import { DummyHospital1, DummyHospital2, DummyHospital3 } from '../../assets';
import { ILHospitalBG } from '../../assets/illustration';
import { ListHospital } from '../../component';
import { colors, fonts } from '../../utils';
import { Fire } from '../../config';

const Hospitals = () => {
  const [hospital, setHospital] = useState([]);
  useEffect(() => {
    getHospital();
  }, []);
  const getHospital = () => {
    Fire.database()
      .ref('hospital/')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const fillterData = data.filter(
            (el) => el !== null,
          );
          setHospital(fillterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (

    <View style={styles.page}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.titleheader}>Nearby Hospitals</Text>
        <Text style={styles.titleheader2}>3 available</Text>
      </ImageBackground>
      <View style={styles.content}>
        {hospital.map((item) => (
          <ListHospital
            key={item.id}
            type={item.type}
            name={item.name}
            address={item.address}
            image={item.image}
          />
        ))}
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    backgroundColor: colors.primary,
    flex: 1,
    borderRadius: 20,
    marginTop: -30,
    paddingTop: 14,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  titleheader: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  titleheader2: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.white,
    textAlign: 'center',
    marginTop: 6,
  },
});
