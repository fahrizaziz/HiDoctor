import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from '../../component';
import { Fire } from '../../config';
import { colors, fonts, getData } from '../../utils';

const Messages = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  useEffect(() => {
    getDataUserFromLocal();
    const rootDB = Fire.database().ref();
    const urlHistory = `messages/${user.uid}/`;
    const messageDB = rootDB.child(urlHistory);
    messageDB
      .on('value', async (snapshot) => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const data = [];
          const promises = await Object.keys(oldData).map(async (key) => {
            const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
            const detailDoctor = await rootDB.child(urlUidDoctor).once('value');

            data.push({
              id: key,
              detailDoctor: detailDoctor.val(),
              ...oldData[key],
            });
          });
          await Promise.all(promises);

          setHistoryChat(data);
        }
      });
  }, [user.uid]);
  const getDataUserFromLocal = () => {
    getData('user')
      .then((res) => {
        setUser(res);
      });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {
          historyChat.map((chat) => {
            const dataDoctor = {
              id: chat.detailDoctor.uid,
              data: chat.detailDoctor,
            };
            return (

              <List
                key={chat.id}
                profile={{ uri: chat.detailDoctor.photo }}
                name={chat.detailDoctor.fullName}
                desc={chat.lastContentChat}
                warna={colors.white}
                col={colors.text.thirht}
                onPress={() => navigation.navigate('Chatting', dataDoctor)}
              />
            );
          })
}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    backgroundColor: colors.primary,
    flex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    color: colors.white,
    marginTop: 30,
    marginLeft: 16,
  },
});