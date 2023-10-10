import React, {useEffect, useState} from 'react';
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
  TextInput,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import navigationString from '../../Navigation/navigationString';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import colors from '../../styles/colors';
import HeaderCompo from '../../Components/HeaderCompo';
import imagePath from '../../constants/imagePath';
import fontFamily from '../../styles/fontFamily';
import TextInputCompo from '../../Components/TextInputCompo';
import ButtonCompo from '../../Components/ButtonCompo';
import Icon from 'react-native-vector-icons/MaterialIcons';

function Following(props) {
  //   console.log('props:', props.route.params.followersList);
  const followerList = props.route.params.followersList;
  //   console.log('followerList is: ', followerList);
  const [followerInformation, setFollowerInformation] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersLength, setUsersLength] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigation = useNavigation();
  const loggedUserUid = auth().currentUser.uid;

  const fetchAllUsersExceptLoggedInUser = async () => {
    const allUsersList = [];

    try {
      const usersCollection = firestore().collection('users');

      // Query all users except the logged-in user
      // const querySnapshot = await usersCollection
      //   .where(firestore.FieldPath.documentId(), '!=', loggedUserUid)
      //   .get();

      // // Loop through the query results
      // querySnapshot.forEach(doc => {
      //   const userData = doc.data();
      //   allUsersList.push({ ...userData, id: doc.id });
      // });

      // // Set the initial data
      // setAllUsers(allUsersList);

      // Set up a real-time listener to automatically update data
      usersCollection
        .where(firestore.FieldPath.documentId(), '!=', loggedUserUid)
        .onSnapshot(snapshot => {
          const updatedUsers = [];

          snapshot.forEach(doc => {
            const userData = doc.data();
            updatedUsers.push({...userData, id: doc.id});
          });

          // Update the state with the updated data
          // console.log(updatedUsers);
          setAllUsers(updatedUsers);
        });

      // console.log('----------------allUsers--------------');
      // console.log(allUsers);
      // console.log('----------------allUsers--------------');
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  const handleSearch = () => {
    const filtered = allUsers.filter(user => {
      return user.fullName.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredUsers(filtered);
    console.log('filtered user', filtered);
    if (filtered.length === 0) {
      // console.log('no search query matching');
      setUsersLength(0);
      setIsEmpty(true); // No matching posts found
    } else {
      // console.log('================Search is matching====================');
      setUsersLength(filtered.length);
      // console.log('filtered.length: ', filtered.length);
      setIsEmpty(false); // Matching posts found
    }
  };

  useEffect(() => {
    if (showAll) {
      fetchAllUsersExceptLoggedInUser();
    }
  }, [showAll]);

  useEffect(() => {
    if (showAll) {
      setFilteredUsers(allUsers);
    }
  }, [showAll, allUsers]);

  const handleFollower = async userId => {
    const userRef = firestore().collection('users').doc(userId);
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
  const handleFollowing = async userId => {
    // userId
    const loggedUserId = auth().currentUser.uid;
    const userRef = firestore().collection('users').doc(loggedUserId);
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

  const handleFollow = async userId => {
    await handleFollower(userId);
    await handleFollowing(userId);
  };

  const fetchUserInformation = async userUIDs => {
    const userInformation = [];

    try {
      const usersCollection = firestore().collection('users');

      // // Use the 'whereIn' method to query documents with matching UIDs
      // const querySnapshot = await usersCollection
      //   .where(firestore.FieldPath.documentId(), 'in', userUIDs)
      //   .get();

      // // Loop through the query results
      // querySnapshot.forEach(doc => {
      //   // Get the data for each document
      //   const userData = doc.data();
      //   userInformation.push({...userData, id: doc.id});
      // });
      // setFollowerInformation(userInformation);

      // Create a real-time listener to automatically update data
      usersCollection
        .where(firestore.FieldPath.documentId(), 'in', userUIDs)
        .onSnapshot(snapshot => {
          const updatedUserInformation = [];

          snapshot.forEach(doc => {
            const userData = doc.data();
            updatedUserInformation.push({...userData, id: doc.id});
          });

          // Update the state with the updated data
          setFollowerInformation(updatedUserInformation);
        });
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  useEffect(() => {
    if (followerList.length > 0) {
      fetchUserInformation(followerList);
    }
  }, [followerList]);

  const handleMessageScreen = item => {
    // console.log('item is: ', item);
    navigation.navigate(navigationString.User_Profile, {userId: item.id});
    // console.log('i am a new function: ', item.id);
    // navigation.navigate(navigationString.Message, {
    //   userData: item,
    //   userId: item.id,
    // });
    // navigation.navigate(navigationString.User_Profile, {userId: item.userId});
  };

  const renderItem = ({item}) => {
    // console.log(item);
    const isFollow = item.follower.includes(loggedUserUid) || false;
    return (
      <View>
        <View style={styles.mainContentStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleMessageScreen(item)}>
              <FastImage
                source={{
                  uri: item.profilePicture,
                  priority: FastImage.priority.normal,
                }}
                style={styles.image}
              />
            </TouchableOpacity>

            <View
              style={{
                marginLeft: moderateScale(14),
                justifyContent: 'center',
                flex: 1,
              }}>
              <Text style={styles.nameStyle}>{item.fullName}</Text>
              <Text numberOfLines={1} style={styles.messageStyle}>
                {item.address}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                // alignSelf: 'center',
                width: '26%',
                borderWidth: 1,
                borderColor: colors.blackOpacity70,
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: moderateVerticalScale(8),
                backgroundColor: isFollow
                  ? colors.socialgray
                  : colors.redOpacity20,
              }}
              activeOpacity={0.4}
              onPress={() => handleFollow(item.id)}>
              {/* <Text></Text> */}
              <Text numberOfLines={1} style={[styles.FollowStyle]}>
                {isFollow ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.socialpinklight}
        barStyle={'dark-content'}
      />
      <View style={styles.headerStyle}>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => navigation.goBack()}>
          <Image
            style={{tintColor: colors.socialpink}}
            source={imagePath.icBack}
          />
        </TouchableOpacity>
        <Text style={styles.headerHeadingStyle}>Following List</Text>
      </View>
      <View style={styles.mainContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: colors.socialpinklight,
            paddingBottom: moderateVerticalScale(12),
          }}>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => setShowAll(false)}
            style={{
              flex: 1,
              alignItems: 'center',
              //   borderBottomWidth: showAll ? 0 : 1,
              //   borderBottomColor: showAll ? colors.gray7 : 'black',
              borderBottomColor: showAll
                ? colors.redOpacity06
                : colors.socialpink,
              borderBottomWidth: 2,
              paddingBottom: moderateVerticalScale(8),
            }}>
            <Text
              style={[
                styles.textStyle,
                {
                  fontFamily: showAll
                    ? fontFamily.regular
                    : fontFamily.semiBold,
                },
              ]}>
              Followers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => setShowAll(true)}
            style={{
              flex: 1,
              alignItems: 'center',
              //   borderBottomWidth: showAll ? 1 : 0,
              borderBottomColor: showAll
                ? colors.socialpink
                : colors.redOpacity06,
              borderBottomWidth: 2,
              paddingBottom: moderateVerticalScale(8),
            }}>
            <Text
              style={[
                styles.textStyle,
                {
                  fontFamily: showAll
                    ? fontFamily.semiBold
                    : fontFamily.regular,
                },
              ]}>
              Find People
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          {!showAll ? (
            <View style={{flex: 1, backgroundColor: colors.whiteColor}}>
              {/* <View
                style={{
                  marginVertical: moderateVerticalScale(16),
                  marginHorizontal: moderateScale(20),
                }}>
                <TextInputCompo
                  placeholder="Search followers..."
                  placeholderTextColor={colors.blackOpacity20}
                  inputStyle={{backgroundColor: colors.socialpinklight}}
                  textStyle={{color: colors.blackOpacity70}}
                  value={searchText}
                  onChangeText={text => setSearchText(text)}
                />
              </View> */}
              <View style={{marginVertical: moderateVerticalScale(14)}} />

              <FlatList
                data={followerInformation}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            </View>
          ) : (
            <View style={{flex: 1, backgroundColor: colors.whiteColor}}>
              {/* //-------Search---------- */}
              {/* <View style={styles.searchBarContainer}> */}
              <View>
                <View
                  style={{
                    marginTop: moderateVerticalScale(14),
                    flexDirection: 'row',
                    // backgroundColor: 'red',
                    paddingHorizontal: moderateScale(20),
                    paddingVertical: moderateVerticalScale(6),
                  }}>
                  <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    value={searchText}
                    onChangeText={text => {
                      setSearchText(text);
                      handleSearch();
                    }}
                  />
                  <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => {
                      if (searchText.length > 0) {
                        setSearchText('');
                        setFilteredUsers(allUsers);
                        setUsersLength(0);
                        setIsEmpty(false);
                      } else {
                        handleSearch();
                      }
                    }}>
                    <Icon
                      name={searchText.length > 0 ? 'clear' : 'done'}
                      size={20}
                      color={colors.whiteColor}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginBottom: moderateVerticalScale(8)}}>
                  {usersLength > 0 ? (
                    <Text style={styles.resultText}>
                      {' '}
                      {usersLength} Result{' '}
                    </Text>
                  ) : null}
                </View>
              </View>
              <FlatList
                data={filteredUsers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            </View>
          )}
        </View>
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
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateVerticalScale(24),
    backgroundColor: colors.socialpinklight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerHeadingStyle: {
    fontSize: scale(16),
    color: colors.socialpink,
    fontFamily: fontFamily.semiBold,
    marginLeft: moderateScale(14),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.socialorange,
  },
  textStyle: {
    fontSize: scale(16),
    textAlign: 'center',
    color: colors.socialpink,
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
    // fontFamily: fontFamily.medium,
  },
  FollowStyle: {
    fontSize: scale(12),
    color: colors.blackColor,
    // fontFamily: fontFamily.medium,
  },
  searchBar: {
    flex: 1,
    height: moderateVerticalScale(44),
    backgroundColor: colors.socialpinklight,
    borderRadius: moderateScale(19),
    paddingLeft: moderateScale(16),
  },
  searchButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    backgroundColor: colors.socialpink,
    borderRadius: moderateScale(19),
    marginLeft: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: scale(14),
    textAlign: 'center',
    color: colors.socialpink,
    fontFamily: fontFamily.regular,
    marginTop: moderateVerticalScale(8),
    // marginLeft: moderateScale(20),
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
});

export default Following;
