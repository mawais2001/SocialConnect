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
import SearchIcon from 'react-native-vector-icons/Ionicons';
import GroupIcon from 'react-native-vector-icons/MaterialIcons';
import fontFamily from '../../styles/fontFamily';
import TextInputCompo from '../../Components/TextInputCompo';
import FastImage from 'react-native-fast-image';

const CreateGroup = props => {
  const userslist = props.route.params.userslist;
  const [userDataList, setUserDataList] = useState(userslist);
  //   const [isLoading, setIsLoading] = useState(true);
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');

  const navigation = useNavigation();
  const userData = auth().currentUser;
  const [selectedUsers, setSelectedUsers] = useState([userData.uid]);
  //   const getChatListHandler = async () => {
  //     try {
  //       const tempArray = [];
  //       const fdata = await firestore().collection('users').get();
  //       fdata.forEach(doc => {
  //         tempArray.push({
  //           id: doc.id,
  //           ...doc.data(),
  //         });
  //       });
  //       if (tempArray.length) {
  //         setUserDataList(tempArray);
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.log('=============Error in getting users=======================');
  //       console.log(error);
  //       console.log('====================================');
  //     }
  //   };

  //   useEffect(() => {
  //     console.log('i am call in useEffect hook');
  //     getChatListHandler();
  //   }, []);

  //   if (isLoading) {
  //     return (
  //       <View
  //         style={{
  //           flex: 1,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           backgroundColor: colors.socialpinklight,
  //         }}>
  //         <ActivityIndicator size="large" color={colors.socialpink} />
  //       </View>
  //     );
  //   }

  //   const handleMessageScreen = item => {
  //     navigation.navigate(navigationString.Message, {
  //       userData: item,
  //       userId: item.id,
  //     });
  //   };

  const handleCreateGroup = item => {
    const uid = item.id;
    // Check if the user is already selected, if yes, remove them; otherwise, add them to the selectedUsers array
    if (selectedUsers.includes(uid)) {
      const updatedUsers = selectedUsers.filter(
        selectedUid => selectedUid !== uid,
      );
      setSelectedUsers(updatedUsers);
    } else {
      setSelectedUsers([...selectedUsers, uid]);
    }
  };

  // Function to create a new group
  const createGroup = async (participants, groupName) => {
    try {
      // Create a new document in the "groups" collection
      const groupRef = await firestore().collection('groups').add({
        groupName: groupName,
        participants: participants,
        // Add other group data if needed
      });

      // Get the ID of the newly created group
      const groupId = groupRef.id;

      return groupId;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  };

  const handleCreateGroupScreen = async () => {
    console.log(selectedUsers);
    if (selectedUsers.length < 2 || groupName.length < 1) {
      return Alert.alert(
        'Warning',
        'Group Name and atleast one participant requreid to create group',
      );
    }

    // const groupId = createGroup(selectedUsers, groupName);
    // navigation.navigate('GroupChatScreen', {groupId});
    try {
      const groupId = await createGroup(selectedUsers, groupName);
      navigation.navigate('GroupChatScreen', {groupId});
    } catch (error) {
      // Handle any errors that occur during group creation
      console.error('Error creating group:', error);
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedUsers.includes(item.id);
    return item.id === userData.uid ? null : (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.mainContentStyle,
          {backgroundColor: isSelected ? colors.blueLight : colors.socialgray},
        ]}
        onPress={() => handleCreateGroup(item)}>
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
          </View>
          <View style={{alignSelf: 'center'}}>
            <Text></Text>
            {/* <Text numberOfLines={1} style={[styles.messageStyle]}>
              5:20
            </Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
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
          <Text style={styles.nameStyle1}>
            Select Participitant{' '}
            {selectedUsers.length > 0 ? selectedUsers.length : null}
          </Text>
          <View />
        </View>
        <View style={{}}>
          <View style={styles.profileStyle}>
            <View style={{alignItems: 'center'}}>
              <FastImage
                style={styles.profileimage}
                source={{
                  uri: userData.photoURL,
                  priority: FastImage.priority.normal,
                }}
              />
              <Text
                style={{
                  fontSize: scale(14),
                  color: colors.socialpink,
                  fontFamily: fontFamily.medium,
                }}>
                You
              </Text>
            </View>
            {/* <View style={{marginHorizontal: moderateScale(10)}} /> */}
            <TextInputCompo
              placeholder="Enter Group Name"
              placeholderTextColor={colors.blackOpacity70}
              inputStyle={{backgroundColor: colors.whiteColor, width: '80%'}}
              onChangeText={text => setGroupName(text)}
              value={groupName}
              textStyle={{color: colors.blackColor}}
            />
            {/* <View /> */}
            {/* <View>
            </View> */}
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
          onPress={handleCreateGroupScreen}
          style={styles.groupIconStyle}>
          <GroupIcon name="arrow-forward" size={35} color={colors.socialpink} />
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
    backgroundColor: colors.socialgray,
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
    fontFamily: fontFamily.semiBold,
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

export default CreateGroup;
