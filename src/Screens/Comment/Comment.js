import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import CrossIcon from 'react-native-vector-icons/Entypo';
import ForwardIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import {
  moderateScale,
  scale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import fontFamily from '../../styles/fontFamily';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TextInputCompo from '../../Components/TextInputCompo';
import imagePath from '../../constants/imagePath';
import ThreeDotICon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RemoveIcon from 'react-native-vector-icons/FontAwesome';
import navigationString from '../../Navigation/navigationString';

function Comment({route}) {
  const {postId, postuserId, commentLength} = route.params;
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [comments, setCommnents] = useState([]);
  const [clength, setCLength] = useState(commentLength);
  const navigation = useNavigation();
  const userId = auth().currentUser.uid;
  const userName = auth().currentUser.displayName;
  const userImage = auth().currentUser.photoURL;

  const handleTextInputFocus = () => {
    console.log('on focus call');
    setIsTextInputFocused(true);
  };

  const handleTextInputBlur = () => {
    console.log('on blure call');
    setIsTextInputFocused(false);
  };

  const profileNaviHandler = item => {
    const userData = auth().currentUser;
    if (userData.uid === item.userId) {
      navigation.navigate(navigationString.PROFILE);
    } else {
      navigation.navigate(navigationString.User_Profile, {userId: item.userId});
    }
  };

  // if (isloading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         backgroundColor: 'rgba(0,0,0,0)',
  //       }}>
  //       <ActivityIndicator size="large" color={colors.socialblue} />
  //     </View>
  //   );
  // }

  const deleteHandler = commentId => {
    try {
      console.log('comment id is: ', commentId);
      Alert.alert('Warning', `Are you sure to delete Comment`, [
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await firestore().collection('comments').doc(commentId).delete();
              setCommentText('');
            } catch (error) {
              console.log('Delete error inside Alert : ', error);
            }
          },
        },
        {
          text: 'No',
        },
      ]);
    } catch (error) {
      console.log('Delete Button error: ', error);
    }
  };

  const handleAddComment = async () => {
    try {
      if (commentText.length > 0) {
        Keyboard.dismiss();
        console.log('before adding comment');
        setIsLoading(true);
        setCommentText('');
        handleTextInputBlur();
        const response = await firestore().collection('comments').add({
          text: commentText,
          time: new Date(),
          userId,
          userName,
          postId,
          postuserId,
          userImage,
        });

        console.log('After adding comment');
        // console.log(response);
        setIsLoading(false);
      } else {
        return null;
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Error while Adding Comment on Post: ', error);
    }
  };

  const getAllComments = async () => {
    try {
      setIsLoading(true);
      const commentsRef = firestore().collection('comments');
      unsubscribe = commentsRef
        .where('postId', '==', postId)
        // .orderBy('time', 'desc')
        .onSnapshot(snap => {
          const temarray = [];
          snap.forEach(doc => {
            // temarray.push(doc.data());
            temarray.push({...doc.data(), id: doc.id});
          });
          // console.log(temarray);
          temarray.sort((a, b) => b.time - a.time);
          setCommnents(temarray);
          setCLength(temarray.length);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.log('Error in getting comments from firestore: ', error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const renderItem = ({item}) => {
    // console.log('comment id', item.id);
    const postTime = item.time.toDate();
    const currentTime = new Date();
    let formattedTime = '';
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    if (
      postTime <= currentTime &&
      postTime >=
        new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          0,
          0,
          0,
        )
    ) {
      formattedTime = postTime.toLocaleTimeString();
      // console.log();
    } else {
      // formattedTime = postTime.toLocaleDateString();
      formattedTime = `${postTime.getDate()} ${
        monthNames[postTime.getMonth()]
      } ${postTime.getFullYear()}`;
    }
    return (
      <View style={{}}>
        <View style={styles.commentst}>
          <View style={{marginRight: moderateScale(10)}}>
            <TouchableOpacity onPress={() => profileNaviHandler(item)}>
              <Image
                style={styles.image}
                source={{
                  uri: item.userImage ? item.userImage : imagePath.avatarImage,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.usernameSyle}>
              {' '}
              {item.userName} {`  .  `}
              <Text style={styles.commentTimeSyle}> {formattedTime} </Text>
            </Text>
            <Text style={styles.commentTextStyle}> {item.text} </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{paddingLeft: moderateScale(10)}}
            onPress={() => deleteHandler(item.id)}>
            {/* <ThreeDotICon
              name="dots-horizontal"
              size={25}
              color={colors.blackColor}
            /> */}
            {userId == item.userId ? (
              <FeatherIcon name="delete" size={18} color={colors.blackColor} />
            ) : (
              <ThreeDotICon
                name="dots-horizontal"
                size={18}
                color={colors.blackColor}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar hidden />
          <View style={{flex: 0.1}} />
          <View style={styles.box1}>
            <View style={styles.headContainer}>
              <Text style={styles.heading}>
                Comments
                <Text style={styles.subheading}>{` (${clength})`}</Text>
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}>
                <RemoveIcon name="remove" size={22} color={colors.blackColor} />
              </TouchableOpacity>
            </View>
            {isloading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0)',
                }}>
                <ActivityIndicator size="large" color={colors.socialblue} />
              </View>
            ) : (
              <View style={styles.commentContainerStyle}>
                <FlatList
                  data={comments}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={<View style={styles.bottomStyle} />}
                />
              </View>
            )}
            {/* <View style={styles.commentContainerStyle}>
              <FlatList
                data={comments}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={<View style={styles.bottomStyle} />}
              />
            </View> */}
          </View>

          <View
            style={{
              flex: 0.1,
              backgroundColor: colors.whiteColor,
              paddingBottom: isTextInputFocused ? 16 : 0,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TextInputCompo
                placeholder="Type a comment..."
                inputStyle={{
                  //   width: '85%',
                  backgroundColor: colors.whiteColor,
                  borderRadius: 0,
                  borderColor: colors.gray2,
                  borderTopWidth: 0.7,
                  flex: 1,
                }}
                placeholderTextColor={colors.blackOpacity70}
                textStyle={{color: colors.blackColor}}
                onFocus={handleTextInputFocus}
                onBlur={handleTextInputBlur}
                value={commentText}
                onChangeText={text => setCommentText(text)}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  flex: 0.2,
                  backgroundColor: colors.socialpinklight,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: colors.gray2,
                  borderTopWidth: 0.7,
                }}
                onPress={handleAddComment}>
                <ForwardIcon
                  name="arrow-forward"
                  size={24}
                  color={colors.blackColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.socialpinklight,
  },
  heading: {
    color: colors.blackColor,
    fontSize: scale(16),
    fontFamily: fontFamily.semiBold,
  },
  subheading: {
    color: colors.blackOpacity70,
    fontSize: scale(14),
    fontFamily: fontFamily.semiBold,
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },
  box1: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    borderTopLeftRadius: moderateScale(36),
    borderTopRightRadius: moderateScale(36),
  },
  commentContainerStyle: {
    flex: 1,
    paddingHorizontal: moderateScale(22),
    paddingTop: moderateVerticalScale(14),
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  usernameSyle: {
    fontSize: scale(16),
    fontFamily: fontFamily.semiBold,
    color: colors.blackColor,
  },
  commentTimeSyle: {
    fontSize: scale(12),
    fontFamily: fontFamily.medium,
    color: colors.grayColor,
  },
  commentTextStyle: {
    fontSize: scale(12),
    color: colors.blackColor,
    fontWeight: 'bold',
    // marginTop: moderateVerticalScale(6),
  },
  commentst: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomStyle: {
    marginVertical: moderateVerticalScale(8),
  },
});

export default Comment;
