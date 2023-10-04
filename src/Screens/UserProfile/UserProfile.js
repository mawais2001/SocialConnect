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

const UserProfile = props => {
  const userId = props.route.params.userId;
  // console.log('===========userId=========================');
  // console.log(userId);
  // console.log('============userId========================');
  const [userDetail, setUserDetail] = useState(null);
  const navigation = useNavigation();
  const getUserData = async () => {
    try {
      const udata = await firestores().collection('users').doc(userId).get();
      if (udata) {
        // console.log(udata);
        setUserDetail(udata._data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessageScreen = userData => {
    console.log('user chat application: ', userData);
    navigation.navigate(navigationString.Message, {
      userData: userData,
      userId: userId,
    });
  };

  useEffect(() => {
    getUserData();
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
              <TouchableOpacity style={styles.followStyle} activeOpacity={0.5}>
                <Text
                  style={{
                    color: colors.whiteColor,
                    fontSize: scale(14),
                    fontWeight: 'bold',
                  }}>
                  Follow
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
          {/* <View style={styles.followbtnContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleMessageScreen(userDetail)}>
              <ChatIcon name="chat" size={30} color={colors.blueColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.followStyle} activeOpacity={0.5}>
              <Text
                style={{
                  color: colors.whiteColor,
                  fontSize: scale(14),
                  fontWeight: 'bold',
                }}>
                Follow
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <AddressIcon
                name="share-social"
                size={30}
                color={colors.blueColor}
              />
            </TouchableOpacity>
          </View> */}
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
});

export default UserProfile;
