import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TextText,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import HeaderCompo from '../../Components/HeaderCompo';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import BackIcon from 'react-native-vector-icons/Ionicons';
import ThreeDotIcon from 'react-native-vector-icons/Entypo';
import {GiftedChat} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';

function Message(props) {
  const [messages, setMessages] = useState([]);
  const receiverId = props.route.params.userId;
  const receiverData = props.route.params.userData;
  const senderData = auth().currentUser;
  const senderId = auth().currentUser.uid;

  const [chatId, setChatId] = useState(generateChatId(senderId, receiverId));
  const navigation = useNavigation();

  function generateChatId(senderId, receiverId) {
    // Sort the user IDs alphabetically to ensure consistency
    const sortedUserIds = [senderId, receiverId].sort();

    // Concatenate the sorted user IDs to create a unique chat ID
    const chatId = `${sortedUserIds[0]}_${sortedUserIds[1]}`;

    return chatId;
  }

  const onSend = (newMessages = []) => {
    // Add new messages to Firebase Firestore
    newMessages.forEach(message => {
      firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          ...message,
          createdAt: new Date(),
        });
    });
  };

  useEffect(() => {
    // Load chat messages from Firebase Firestore
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc') // Adjust the order as per your preference
      .onSnapshot(snapshot => {
        const newMessages = snapshot.docs.map(doc => ({
          ...doc.data(),
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        }));

        setMessages(newMessages);
      });

    return () => unsubscribe();
  }, [chatId]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.whiteColor}
        barStyle={'dark-content'}
      />
      <View style={styles.headerStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}>
            <BackIcon name="arrow-back" size={22} color={colors.socialpink} />
          </TouchableOpacity>
          <FastImage
            style={styles.imageStyle}
            source={{
              uri: receiverData.profilePicture
                ? receiverData.profilePicture
                : imagePath.avatarImage,
              priority: FastImage.priority.normal,
            }}
          />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: scale(16),
              color: colors.socialpink,
              fontWeight: 'bold',
            }}>
            {receiverData.fullName}
          </Text>
        </View>
        <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}>
          <ThreeDotIcon
            name="dots-three-horizontal"
            size={18}
            color={colors.socialpink}
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, backgroundColor: 'white'}}>
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: senderId,
          }}
          messagesContainerStyle={{backgroundColor: colors.socialpinklight}}
          textInputStyle={{
            backgroundColor: colors.whiteColor,
            borderRadius: moderateScale(20),
            paddingHorizontal: moderateScale(12),
            marginHorizontal: moderateScale(20),
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  headerStyle: {
    backgroundColor: colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateVerticalScale(12),
  },
  imageStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginLeft: moderateScale(10),
  },
});

export default Message;
