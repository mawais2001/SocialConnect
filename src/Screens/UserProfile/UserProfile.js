import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import imagePath from '../../constants/imagePath';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import firestores from '@react-native-firebase/firestore';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/Entypo';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddressIcon from 'react-native-vector-icons/Ionicons';
import ChatIcon from 'react-native-vector-icons/MaterialIcons';
import navigationString from '../../Navigation/navigationString';
import FastImage from 'react-native-fast-image';
import fontFamily from '../../styles/fontFamily';
import auth from '@react-native-firebase/auth';

const UserProfile = props => {
  const userId = props.route.params.userId;
  // console.log('===========userId=========================');
  // console.log(userId);
  // console.log('============userId========================');
  const [userDetail, setUserDetail] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [numColumns, setNumColumns] = useState(3);
  const [follow, setFollow] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const navigation = useNavigation();
  // const getUserData = async () => {
  //   try {
  //     const udata = await firestores().collection('users').doc(userId).get();
  //     if (udata) {
  //       // console.log(udata);
  //       setUserDetail(udata._data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getUserData = async () => {
    const loggedUserUid = auth().currentUser.uid;
    try {
      const udata = await firestores()
        .collection('users')
        .doc(userId)
        .onSnapshot(querySnapshot => {
          // console.log('querySnapshot: ', querySnapshot.data());
          const userAllDetails = querySnapshot.data();
          const isFollow =
            userAllDetails?.follower?.includes(loggedUserUid) || false;
          setFollow(isFollow);
          setUserDetail(userAllDetails);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async () => {
    try {
      const postsref = firestores()
        .collection('posts')
        .doc(userId)
        .collection('allposts');
      const querySnapshot = await postsref.get();
      const userPosts = [];
      querySnapshot.forEach(doc => {
        const postData = doc.data();
        userPosts.push({...postData, id: doc.id});
      });
      setUserPosts(userPosts);
      // Now userPosts array contains all posts for the user
      // console.log('User Posts:', userPosts.length);
    } catch (error) {
      console.log('Error getting while getting posts of users:', error);
    }
  };

  const handleMessageScreen = userData => {
    // console.log('user chat application: ', userData);
    navigation.navigate(navigationString.Message, {
      userData: userData,
      userId: userId,
    });
  };

  const handleFollower = async () => {
    const userRef = firestores().collection('users').doc(userId);
    const loggedUserId = auth().currentUser.uid;
    try {
      const fuserRef = await userRef.get();
      if (fuserRef.exists) {
        const fuserData = fuserRef.data();

        if (fuserData.hasOwnProperty('follower')) {
          let updatedFollowers = [...fuserData.follower]; // Create a new array
          if (fuserData.follower.includes(loggedUserId)) {
            updatedFollowers = updatedFollowers.filter(
              id => id !== loggedUserId,
            ); // Remove like
          } else {
            updatedFollowers.push(loggedUserId); // Add like
          }
          await userRef.update({follower: updatedFollowers}); // Update the likes
          // setFollowerCount(updatedFollowers.length);
        }
      }
    } catch (error) {
      console.log('Error in follower function: ', error);
    }
  };
  const handleFollowing = async () => {
    // userId
    const loggedUserId = auth().currentUser.uid;
    const userRef = firestores().collection('users').doc(loggedUserId);
    try {
      const fuserRef = await userRef.get();
      if (fuserRef.exists) {
        const fuserData = fuserRef.data();

        if (fuserData.hasOwnProperty('following')) {
          let updatedFollowers = [...fuserData.following]; // Create a new array
          if (fuserData.following.includes(userId)) {
            updatedFollowers = updatedFollowers.filter(id => id !== userId); // Remove like
          } else {
            updatedFollowers.push(userId); // Add like
          }
          await userRef.update({following: updatedFollowers}); // Update the likes
          // setFollowerCount(updatedFollowers.length);
        }
      }
    } catch (error) {
      console.log('Error in follower function: ', error);
    }
  };

  const handleFollow = async () => {
    await handleFollower();
    await handleFollowing();
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.column}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('DetailPost', {postData: item})}>
          <FastImage
            style={styles.postImage}
            source={{uri: item.imageUrl, priority: FastImage.priority.normal}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    getUserData();
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileImgConatiner}>
        {userDetail && userDetail.profilePicture ? (
          <FastImage
            style={styles.profileImgStyle}
            source={{
              uri: userDetail.profilePicture,
              priority: FastImage.priority.normal,
            }}
          />
        ) : (
          <ActivityIndicator size="small" color="gray" />
        )}
      </View>
      <ImageBackground
        blurRadius={2}
        source={{
          uri:
            userDetail && userDetail.profilePicture
              ? userDetail.profilePicture
              : imagePath.avatarImage,
        }}
        resizeMode="cover"
        style={styles.coverPicStyle}>
        <View style={styles.headerCompoStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={imagePath.icBack}
              style={{tintColor: colors.whiteColor}}
            />
          </TouchableOpacity>
          <Icon
            name="dots-three-horizontal"
            size={22}
            color={colors.whiteColor}
          />
        </View>
      </ImageBackground>
      <View style={styles.mainContainer}>
        <View style={{flex: 1}} />
        <View style={styles.nameContainerStyle}>
          {userDetail && userDetail.fullName ? (
            <Text style={styles.profilenameStyle}> {userDetail.fullName} </Text>
          ) : (
            <ActivityIndicator size="small" color="gray" />
          )}
          {userDetail && userDetail.address ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AddressIcon
                name="location-outline"
                size={20}
                color={colors.blackOpacity60}
              />
              <Text style={styles.addressStyle}> {userDetail.address} </Text>
            </View>
          ) : null}
          {userDetail && userDetail.email ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: moderateVerticalScale(8),
              }}>
              <EmailIcon
                name="email-outline"
                size={20}
                color={colors.blackOpacity60}
              />
              <Text style={styles.emailStyle}> {userDetail.email} </Text>
            </View>
          ) : (
            <ActivityIndicator size="small" color="gray" />
          )}
          {userDetail && userDetail.profilePicture ? (
            <View style={styles.followbtnContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleMessageScreen(userDetail)}>
                <ChatIcon name="chat" size={30} color={colors.blueColor} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.followStyle,
                  {
                    backgroundColor: follow ? colors.gray2 : colors.blueColor,
                  },
                ]}
                activeOpacity={0.5}
                onPress={handleFollow}>
                <Text
                  style={{
                    color: colors.whiteColor,
                    fontSize: scale(14),
                    fontWeight: 'bold',
                  }}>
                  {!!follow ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <AddressIcon
                  name="share-social"
                  size={30}
                  color={colors.blueColor}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.followerDetails}>
            <View style={styles.followerContainer}>
              <Text style={styles.followerHeading}>
                {userPosts && userPosts.length ? (
                  userPosts.length
                ) : (
                  <ActivityIndicator size="small" color="gray" />
                )}
              </Text>
              <Text style={styles.followerSubHeading}>POSTS</Text>
            </View>
            <View style={{borderRightWidth: 1, borderRightColor: 'gray'}} />
            <View style={styles.followerContainer}>
              <Text style={styles.followerHeading}>
                {' '}
                {userDetail && userDetail.follower ? (
                  userDetail.follower.length
                ) : (
                  <ActivityIndicator size="small" color="gray" />
                )}{' '}
              </Text>
              <Text style={styles.followerSubHeading}>FOLLOWERS</Text>
            </View>
            <View style={{borderRightWidth: 1, borderRightColor: 'gray'}} />
            <View style={styles.followerContainer}>
              <Text style={styles.followerHeading}>
                {' '}
                {userDetail && userDetail.following ? (
                  userDetail.following.length
                ) : (
                  <ActivityIndicator size="small" color="gray" />
                )}{' '}
              </Text>
              <Text style={styles.followerSubHeading}>FOLLOWING</Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: moderateVerticalScale(12),
              height: moderateVerticalScale(4),
              backgroundColor: colors.socialgray,
              width: '100%',
            }}
          />
          <View
            style={{
              flex: 1,
              width: '100%',
              // marginTop: moderateVerticalScale(2),
              paddingHorizontal: moderateScale(10),
            }}>
            <View
              style={{
                // marginVertical: moderateVerticalScale(8),
                backgroundColor: colors.whiteColorOpacity70,
                paddingHorizontal: moderateScale(8),
                paddingVertical: moderateVerticalScale(6),
              }}>
              <Text
                style={{
                  fontSize: scale(14),
                  color: colors.blackColor,
                  fontFamily: fontFamily.semiBold,
                }}>
                Posts
              </Text>
            </View>
            <FlatList
              data={userPosts}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={numColumns}
              showsVerticalScrollIndicator={false}
              // horizontal={true} // Set this to true for row-wise display
              // numColumns={3}
              // horizontal={true}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackOpacity10,
  },
  coverPicStyle: {
    backgroundColor: 'dodgerblue',
    flex: 1,
  },
  profileImgStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImgConatiner: {
    zIndex: 1,
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  mainContainer: {
    backgroundColor: colors.whiteColor,
    flex: 5,
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    shadowColor: colors.blackColor,
  },
  headerCompoStyle: {
    backgroundColor: colors.blackOpacity20,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainerStyle: {
    alignItems: 'center',
    flex: 6,
  },
  profilenameStyle: {
    fontSize: scale(20),
    color: colors.blackColor,
    fontFamily: 'notoserif',
    marginBottom: moderateVerticalScale(10),
  },
  addressStyle: {
    fontSize: scale(12),
    color: colors.blackOpacity60,
    marginLeft: moderateScale(8),
    textAlign: 'center',
  },
  emailStyle: {
    fontSize: scale(12),
    color: colors.blackOpacity60,
    textAlign: 'center',
    // marginTop: moderateVerticalScale(5),
    marginLeft: moderateScale(8),
  },
  followStyle: {
    backgroundColor: colors.blueColor,
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateVerticalScale(14),
    borderRadius: moderateScale(22),
  },
  followbtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: moderateScale(22),
    marginTop: moderateVerticalScale(14),
  },
  followerDetails: {
    marginTop: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'red',
    width: '100%',
    // paddingHorizontal: moderateScale(22),
    // alignItems: 'center',
  },
  followerHeading: {
    color: colors.blackColor,
    fontFamily: fontFamily.bold,
    fontSize: scale(12),
  },
  followerSubHeading: {
    color: colors.grayColor,
    fontFamily: fontFamily.medium,
    fontSize: scale(10),
  },
  followerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    flex: 1,
  },
  column: {
    flex: 1, // Ensure each image takes up equal space in the column
    // margin: 2, // Add spacing between images
    flexDirection: 'row',
    alignItems: 'center',
    margin: 6,
    // backgroundColor: 'black',
  },
  postImage: {
    // flex: 1, // Make the image fill the available space in the column
    // aspectRatio: 1, // Maintain the aspect ratio (square images)
    width: '100%',
    aspectRatio: 1,
    borderRadius: 6,
    // padding: 8,
  },
});

export default UserProfile;
