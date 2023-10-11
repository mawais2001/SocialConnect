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
  ActivityIndicator,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Octicons';
import MyIcon from 'react-native-vector-icons/Ionicons';
import Like from 'react-native-vector-icons/AntDesign';
import Comment from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-vector-icons/Entypo';
import colors from '../../styles/colors';
import ThreeDotICon from 'react-native-vector-icons/MaterialCommunityIcons';
import {height} from '../../styles/responsiveSize';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import navigationString from '../../Navigation/navigationString';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import imagePath from '../../constants/imagePath';
import CustomModal from '../Notification/CustomModal';
import fontFamily from '../../styles/fontFamily';
import LikeCompo from '../Like/LikeCompo';
import FastImage from 'react-native-fast-image';
import CommentCompo from '../Comment/CommentCompo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const MemoizedFlatList = React.memo(FlatList);

function Home(props) {
  const [postList, setPostList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  // const [udetail, setUDetail] = useState({});
  const [update, setUpdate] = useState();
  const navigation = useNavigation();
  const userData = auth().currentUser;
  const isFocused = useIsFocused();

  // const getMyPostsData = async () => {
  //   const allPostsArray = [];
  //   // let userId = ""
  //   firestore()
  //     .collection('posts')
  //     .onSnapshot(snap => {
  //       snap.forEach(doc => {
  //         // console.log("user id before: ", doc.id);
  //         firestore()
  //           .collection('posts')
  //           .doc(doc.id)
  //           .collection('allposts')
  //           .orderBy('timestamp', 'desc')
  //           .onSnapshot(finalDoc => {
  //             var lenght__ = 0;
  //             var finalLength = finalDoc.size;
  //             if (finalLength === 0) {
  //               setIsEmpty(true);
  //             } else {
  //               setIsEmpty(false);
  //             }
  //             finalDoc.forEach(postData => {
  //               const postDataInside = postData.data();
  //               const postId = postData.id;
  //               // console.log("user id After: ", doc.id);
  //               if (postDataInside) {
  //                 lenght__ = lenght__ + 1;
  //                 allPostsArray.push({
  //                   postId,
  //                   userId: doc.id,
  //                   ...postDataInside,
  //                 });
  //               }
  //             });
  //             if (lenght__ === finalLength) {
  //               setPostList(allPostsArray);
  //             }
  //           });
  //       });
  //     });
  // };

  const getMyPostsData = useCallback(async () => {
    try {
      const allPostsArray = [];
      const snapshot = await firestore().collection('posts').get();

      for (const doc of snapshot.docs) {
        const postDoc = await firestore()
          .collection('posts')
          .doc(doc.id)
          .collection('allposts')
          .orderBy('time', 'desc')
          .get();

        if (postDoc.size === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }

        postDoc.forEach(postData => {
          const postDataInside = postData.data();
          const postId = postData.id;

          if (postDataInside) {
            allPostsArray.push({
              postId,
              userId: doc.id,
              ...postDataInside,
            });
          }
        });
      }
      allPostsArray.sort((a, b) => b.time - a.time);
      setPostList(allPostsArray);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  const profileNaviHandler = item => {
    if (userData.uid === item.userId) {
      navigation.navigate(navigationString.PROFILE);
    } else {
      navigation.navigate(navigationString.User_Profile, {userId: item.userId});
    }
  };

  const customModalHandler = item => {
    setSelectedItem(item); // Set the selected item when the button is pressed
    setShowModal(!showModal); // Show the modal
  };

  const renderItem = ({item, index, customModalHandler}) => {
    const handlePress = () => {
      customModalHandler(item);
    };
    // const timestamp = item.time;
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

    // if (timestamp) {
    //   const dateObject = timestamp.toDate();
    //   if (dateObject instanceof Date && !isNaN(dateObject)) {
    //     formattedTime = dateObject.toDateString();
    //   }
    // }

    return (
      <View style={styles.post1}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => profileNaviHandler(item)}>
              <FastImage
                style={styles.profileStyle}
                source={{
                  uri: item.userPicture ? item.userPicture : imagePath.avatar,
                  priority: FastImage.priority.normal,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingLeft: moderateScale(8),
              }}>
              <Text numberOfLines={1} style={styles.profileNameStyle}>
                {' '}
                {item.userName ? item.userName : 'Anonymous User'}
              </Text>
              <Text numberOfLines={1} style={styles.profileDescStyle}>
                {item.userAddress ? item.userAddress : 'Anonymous Address'}{' '}
              </Text>
              <View />
            </View>
          </View>
          <View>
            <ThreeDotICon
              name="dots-horizontal"
              size={25}
              color={colors.blackColor}
              onPress={handlePress}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DetailPost', {postData: item})}>
            <FastImage
              style={styles.postImageStyle}
              source={{
                uri: item.imageUrl ? item.imageUrl : imagePath.blankimage,
                priority: FastImage.priority.normal,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.postTitleStyle}> {item.title} </Text>
          {/* <Text
            style={[
              styles.postDescStyle,
              {
                marginVertical: item.description.length
                  ? moderateVerticalScale(3)
                  : 0,
              },
            ]}
            numberOfLines={2}>
            {' '}
            {item.description}{' '}
          </Text> */}
          {item.description.length > 0 ? (
            <Text style={styles.postDescStyle} numberOfLines={2}>
              {' '}
              {item.description}{' '}
            </Text>
          ) : null}
          <Text style={styles.postTimeStyle}> {formattedTime} </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: moderateVerticalScale(20),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Like name="like2" size={24} color={colors.blackColor} />
            <Text style={styles.likecommentStyle}>50</Text> */}
            <LikeCompo
              postId={item.postId}
              postuserId={item.userId}
              onLike={handleLike}
            />
            <View style={{marginHorizontal: moderateScale(25)}} />
            {/* <Comment name="comment-o" size={24} color={colors.blackColor} />
            <Text style={styles.likecommentStyle}>22</Text> */}
            <CommentCompo postId={item.postId} postuserId={item.userId} />
          </View>
          <Share name="share" size={24} color={colors.blackColor} />
        </View>
      </View>
    );
  };

  const handleListEmptyComponent = () => {
    return (
      <View>
        {isEmpty ? (
          <Text
            style={{
              marginVertical: moderateVerticalScale(12),
              fontSize: scale(16),
              color: colors.redColor,
              textAlign: 'center',
            }}>
            Connecting...
          </Text>
        ) : (
          <ActivityIndicator size="large" color={colors.socialpink} />
        )}
      </View>
    );
  };

  const handleDeleteSuccess = async () => {
    try {
      const updatedPostList = postList.filter(
        post => post.postId !== selectedItem.postId,
      );
      setPostList(updatedPostList);
      setSelectedItem(null); //
      await getMyPostsData();
    } catch (error) {
      console.log('Error in deleting post: ', error);
    }
    // getMyPostsData();
  };

  const handleLike = () => {
    getMyPostsData();
  };

  const setFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // console.log(fcmToken);
      await firestore().collection('fcmtoken').doc(userData.uid).set({
        token: fcmToken,
      });
    }
  };

  useEffect(() => {
    getMyPostsData();
  }, [isFocused, getMyPostsData]);

  useEffect(() => {
    setFcmToken();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.socialpinklight}
        barStyle={'dark-content'}
      />
      <View style={styles.head}>
        <Image style={styles.logoStyle} source={imagePath.global} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 0.5,
            // backgroundColor: 'black',
          }}>
          <Icon
            name="diff-added"
            size={24}
            style={{marginLeft: 2}}
            color={colors.socialpink}
            onPress={() => navigation.navigate(navigationString.CREATE_POST)}
          />
          <View style={{marginHorizontal: moderateScale(8)}} />
          <MyIcon
            name="chatbox-ellipses"
            size={24}
            color={colors.socialpink}
            onPress={() => navigation.navigate(navigationString.ChatList)}
          />
        </View>
      </View>
      <View style={styles.main}>
        <MemoizedFlatList
          data={postList}
          renderItem={({item, index}) =>
            renderItem({item, index, customModalHandler})
          }
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={<View style={styles.bottomStyle} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={handleListEmptyComponent}
          initialNumToRender={10}
        />
        {selectedItem && (
          <CustomModal
            visible={showModal}
            closeModal={() => setShowModal(false)}
            postData={selectedItem}
            userData={userData.uid}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  head: {
    flex: 0.2,
    backgroundColor: colors.socialpinklight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(12),
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.blackOpacity70,
    shadowColor: colors.blackColor,
    elevation: 20,
  },
  main: {
    flex: 3,
    backgroundColor: colors.whiteColorOpacity20,
  },
  post1: {
    backgroundColor: colors.whiteColorOpacity20,
    marginHorizontal: moderateScale(6),
    padding: moderateScale(10),
  },
  profileStyle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    resizeMode: 'cover',
  },
  profileNameStyle: {
    fontSize: scale(15),
    color: colors.blackColor,
    fontFamily: fontFamily.regular,
  },
  profileDescStyle: {
    fontSize: scale(10),
    color: colors.blackOpacity70,
    fontFamily: fontFamily.medium,
  },
  postImageStyle: {
    width: '100%',
    height: height / 2,
    borderRadius: moderateScale(8),
    resizeMode: 'cover',
    marginVertical: moderateVerticalScale(14),
  },
  postTitleStyle: {
    fontSize: scale(12),
    color: colors.blackColor,
    // fontWeight: '700',
    fontFamily: fontFamily.semiBold,
  },
  postDescStyle: {
    fontSize: scale(10),
    color: colors.blackOpacity90,
    marginVertical: moderateVerticalScale(3),
    fontFamily: fontFamily.medium,
  },
  postTimeStyle: {
    fontSize: scale(8),
    color: colors.blackColor,
    // fontWeight: '500',
    fontFamily: fontFamily.light,
  },
  bottomStyle: {
    marginVertical: moderateVerticalScale(2),
    height: moderateVerticalScale(2),
    backgroundColor: colors.gray7,
  },
  likecommentStyle: {
    fontSize: scale(12),
    color: colors.grayColor,
    fontWeight: '500',
    marginLeft: moderateScale(10),
  },
  modalStyle: {
    backgroundColor: colors.wlight,
    height: height / 3,
    width: '60%',
    borderWidth: 1,
    borderColor: colors.blackOpacity15,
    shadowColor: colors.blackOpacity40,
    elevation: 10,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(18),
    paddingVertical: moderateVerticalScale(12),
  },
  logoStyle: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
  },
});

export default Home;
