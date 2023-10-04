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
import SearchIcon from 'react-native-vector-icons/Ionicons';
import GroupIcon from 'react-native-vector-icons/MaterialIcons';
import fontFamily from '../../styles/fontFamily';
import FastImage from 'react-native-fast-image';

const ChatList = props => {
  const [userDataList, setUserDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const userData = auth().currentUser;

  const getChatListHandler = async () => {
    try {
      const tempArray = [];
      const fdata = await firestore().collection('users').get();
      fdata.forEach(doc => {
        tempArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      if (tempArray.length) {
        setUserDataList(tempArray);
        setIsLoading(false);
      }
      //   if (userDataList.length) {
      //     console.log('===========User data list START=========================');
      //     console.log(userDataList);
      //     console.log('============User data list END========================');
      //   }
    } catch (error) {
      console.log('=============Error in getting users=======================');
      console.log(error);
      console.log('====================================');
    }
  };

  useEffect(() => {
    // console.log('i am call in useEffect hook');
    getChatListHandler();
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

  const handleMessageScreen = item => {
    // console.log('i am a new function: ', item.id);
    navigation.navigate(navigationString.Message, {
      userData: item,
      userId: item.id,
    });
  };

  const renderItem = ({item}) => {
    return item.id === userData.uid ? null : (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.mainContentStyle}
        onPress={() => handleMessageScreen(item)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            source={{
              uri: item.profilePicture,
              priority: FastImage.priority.normal,
            }}
            style={styles.image}
          />
          <View
            style={{
              marginLeft: moderateScale(14),
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text style={styles.nameStyle}>{item.fullName}</Text>
            <Text numberOfLines={1} style={styles.messageStyle}>
              Hi, how are you!
            </Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Text></Text>
            <Text numberOfLines={1} style={[styles.messageStyle]}>
              5:20
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    //   <TouchableOpacity activeOpacity={0.5} style={styles.mainContentStyle}>
    //     <Image
    //       source={{uri: item.profilePicture}}
    //       style={{width: 50, height: 50}}
    //     />
    //     <Text>{item.fullName}</Text>
    //   </TouchableOpacity>
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.socialpinklight}
        barStyle={'dark-content'}
      />
      <View style={{backgroundColor: colors.socialpinklight}}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={imagePath.icBack}
              style={{tintColor: colors.socialpink}}
            />
          </TouchableOpacity>
          <Text style={styles.nameStyle1}>Chats</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationString.AllGroups)}>
            <GroupIcon name="group" size={28} color={colors.socialpink} />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <View style={styles.profileStyle}>
            <View>
              <FastImage
                style={styles.profileimage}
                source={{
                  uri: userData.photoURL,
                  priority: FastImage.priority.normal,
                }}
              />
            </View>
            <View>
              <SearchIcon name="search" size={24} color={colors.socialpink} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.listStyle}>
        <FlatList
          data={userDataList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.groupStyle}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate(navigationString.CreateGroup, {
              userslist: userDataList,
            })
          }
          style={styles.groupIconStyle}>
          <GroupIcon name="group-add" size={30} color={colors.socialpink} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.socialpinklight,
  },
  mainContentStyle: {
    backgroundColor: colors.socialpinklight,
    marginBottom: moderateVerticalScale(10),
    marginHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(10),
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(12),
  },
  image: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
  },
  nameStyle: {
    fontSize: scale(13),
    color: colors.blackColor,
    // fontWeight: '500',
    fontFamily: fontFamily.semiBold,
  },
  messageStyle: {
    fontSize: scale(10),
    color: colors.blackOpacity70,
    fontFamily: fontFamily.medium,
  },
  profileimage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  profileStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateVerticalScale(12),
    // backgroundColor: 'red',
    // flex: 1,
  },
  chatBtnSyle: {
    alignItems: 'center',
    backgroundColor: colors.socialgreen,
    paddingHorizontal: moderateScale(70),
    paddingVertical: moderateVerticalScale(9),
    borderRadius: moderateScale(16),
  },
  listStyle: {
    marginTop: moderateVerticalScale(10),
    flex: 7,
    backgroundColor: colors.whiteColor,
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
    paddingTop: moderateVerticalScale(20),
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(12),
  },
  nameStyle1: {
    fontSize: scale(16),
    color: colors.socialpink,
    // fontWeight: 'bold',
    fontFamily: fontFamily.poppinsBlack,
  },
  groupStyle: {
    backgroundColor: colors.whiteColor,
    flex: 1.5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(22),
    paddingBottom: moderateVerticalScale(10),
  },
  groupIconStyle: {
    backgroundColor: colors.socialpinklight,
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
  },
});

export default ChatList;
