import React, { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { ChatItem, Header, InputChat } from '../../component';
import {
  colors, fonts, getChatTime, getData, setDateChat, showError,
} from '../../utils';
import { Fire } from '../../config';

const Chatting = ({ navigation, route }) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);
  useEffect(() => {
    getDataUserFromLocal();
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatID}/allchat/`;
    Fire.database()
      .ref(urlFirebase)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const allDataChat = [];
          Object.keys(dataSnapshot)
            .map((key) => {
              const dataChat = dataSnapshot[key];
              const newDataChat = [];
              Object.keys(dataChat)
                .map((itemChat) => {
                  newDataChat.push({
                    id: itemChat,
                    data: dataChat[itemChat],
                  });
                });
              allDataChat.push({
                id: key,
                data: newDataChat,
              });
            });
          setChatData(allDataChat);
        }
      });
  }, [dataDoctor.data.uid, user.uid]);
  const getDataUserFromLocal = () => {
    getData('user')
      .then((res) => {
        setUser(res);
      });
  };
  const chatSend = () => {
    const today = new Date();
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent,
    };
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatID}/allchat/${setDateChat(today)}`;
    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };
    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };
    Fire.database()
      .ref(urlFirebase)
      .push(data)
      .then(() => {
        setChatContent('');
        Fire.database()
          .ref(urlMessageUser)
          .set(dataHistoryChatForUser);
        Fire.database()
          .ref(urlMessageDoctor)
          .set(dataHistoryChatForDoctor);
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (

    <View style={styles.page}>
      <Header
        type="chat-profile"
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.category}
        photo={{ uri: dataDoctor.data.photo }}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            chatData.map((chat) => (
              <View key={chat.id}>

                <Text style={styles.chatdate}>{chat.id}</Text>
                {
                  chat.data.map((itemChat) => {
                    const isMe = itemChat.data.sendBy === user.uid;
                    return (

                      <ChatItem
                        key={itemChat.id}
                        isMe={isMe}
                        text={itemChat.data.chatContent}
                        date={itemChat.data.chatTime}
                        photo={isMe ? null : { uri: dataDoctor.data.photo }}
                      />
                    );
                  })
                }
              </View>
            ))
          }
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={(value) => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chatdate: {
    fontSize: 11,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
