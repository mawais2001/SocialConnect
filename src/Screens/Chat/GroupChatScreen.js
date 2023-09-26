import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import ButtonCompo from '../../Components/ButtonCompo';
import colors from '../../styles/colors';
import navigationString from '../../Navigation/navigationString';
import {height} from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import fontFamily from '../../styles/fontFamily';
import TextInputCompo from '../../Components/TextInputCompo';
import {GiftedChat} from 'react-native-gifted-chat';
import BackIcon from 'react-native-vector-icons/Ionicons';
import ThreeDotIcon from 'react-native-vector-icons/Entypo';
import {sendMessageToGroup, getGroupMessages} from './GroupFunctions';

function GroupChatScreen(props) {
  const groupId = props.route.params.groupId;
  const [groupdata, setGroupData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const senderId = auth().currentUser.uid;
  const navigation = useNavigation();
  const getGroupData = async () => {
    try {
      setIsLoading(true);
      const data = await firestore().collection('groups').doc(groupId).get();
      setGroupData(data.data());
      setIsLoading(false);
      console.log('=======Group data=============================');
      console.log(data.data());
      console.log('====================================');
    } catch (error) {
      setIsLoading(false);

      console.log(
        '=========Error while getting Group information from firestore START===========================',
      );
      console.log(error);
      console.log(
        '=========Error while getting Group information from firestore END===========================',
      );
    }
  };

  const onSend = async (newMessages = []) => {
    const text = newMessages[0].text;
    try {
      await sendMessageToGroup(groupId, senderId, text);
      // Update the local messages with the newly sent message
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const messages = await getGroupMessages(groupId);
      // Format messages for GiftedChat
      const formattedMessages = messages.map(message => ({
        _id: message.id,
        text: message.text,
        // createdAt: new Date(message.timestamp.toDate()),
        // createdAt: message.timestamp.toDate(),
        createdAt: message.timestamp ? message.timestamp.toDate() : new Date(),
        user: {
          _id: message.sender,
          // Add other user data if needed
        },
      }));
      setMessages(formattedMessages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    getGroupData();
    loadMessages();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.socialpinklight,
        }}>
        <ActivityIndicator size="large" color={colors.socialpink} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate(navigationString.ChatList)}>
            <BackIcon name="arrow-back" size={22} color={colors.socialpink} />
          </TouchableOpacity>
          <Image style={styles.imageStyle} source={imagePath.groupavatar} />
        </View>
        <View>
          <Text
            style={{
              fontSize: scale(16),
              color: colors.socialpink,
              fontWeight: 'bold',
            }}>
            {groupdata.groupName}
          </Text>
        </View>
        <TouchableOpacity>
          <ThreeDotIcon
            name="dots-three-horizontal"
            size={18}
            color={colors.socialpink}
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, backgroundColor: colors.socialpinklight}}>
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: senderId,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    marginLeft: moderateScale(14),
  },
});

export default GroupChatScreen;
