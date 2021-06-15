import React, { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../component';
import { Fire } from '../../config';
import {
  colors, fonts, showError,
} from '../../utils';

const Doctor = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [categorydoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    getNews();
    getCategoryDoctor();
    getTopRatedDoctors();
  }, []);

  const getTopRatedDoctors = () => {
    Fire.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then((res) => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setDoctors(data);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  const getCategoryDoctor = () => {
    Fire.database()
      .ref('category_doctor/')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const fillterData = data.filter(
            (el) => el !== null,
          );
          setCategoryDoctor(fillterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  const getNews = () => {
    Fire.database()
      .ref('news/')
      .once('value')
      .then((res) => {
        if (res.val()) {
          const data = res.val();
          const fillterData = data.filter(
            (el) => el !== null,
          );
          setNews(fillterData);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (

    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Gap height={30} />
            <Text style={styles.welcometext}>
              Want to consult with who is today?
            </Text>
          </View>
          <Gap height={16} />
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoryS}>
                <Gap width={32} />
                {
                categorydoctor.map((item) => <DoctorCategory key={`category-${item.id}`} category={item.category} onPress={() => navigation.navigate('ChooseDoctor', item)} />)
              }
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <Gap height={30} />
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionlabel}>Top Rated Doctors</Text>
            <Gap height={6} />
            {
              doctors.map((doctor) => (
                <RatedDoctor
                  key={doctor.id}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  avatar={{ uri: doctor.data.photo }}
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
              ))
            }
            <Gap height={24} />
            <Text style={styles.sectionlabel}>Good News</Text>
          </View>
          <Gap height={6} />
          {news.map((item) => (
            <NewsItem
              key={`news-${item.id}`}
              title={item.title}
              date={item.date}
              image={item.image}
            />
          ))}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    backgroundColor: colors.primary,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcometext: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    color: colors.white,
    maxWidth: 201,
  },
  categoryS: {
    flexDirection: 'row',
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  wrapperScroll: { marginHorizontal: -16 },
  sectionlabel: {
    fontSize: 16,
    fontFamily: fonts.primary[700],
    color: colors.white,
  },
});
