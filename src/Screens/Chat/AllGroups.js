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
import BackIcon from 'react-native-vector-icons/Ionicons';
import ThreeDotIcon from 'react-native-vector-icons/Entypo';

function AllGroups(props) {
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const userUid = auth().currentUser.uid;
  useEffect(() => {
    // Function to fetch user's groups
    const fetchUserGroups = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await firestore()
          .collection('groups')
          .where('participants', 'array-contains', userUid)
          .get();
        console.log('============querySnapshot========================');
        console.log(querySnapshot);
        console.log('====================================');
        const groups = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserGroups(groups);
        console.log('====================================');
        console.log(groups);
        console.log('====================================');
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.error('Error fetching user groups:', error);
      }
    };

    fetchUserGroups();
  }, [userUid]);

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

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.mainContentStyle}
        onPress={() =>
          navigation.navigate(navigationString.GroupChatScreen, {
            groupId: item.id,
            allgroup: true,
          })
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={imagePath.groupavatar} style={styles.image} />
          <View
            style={{
              marginLeft: moderateScale(14),
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text style={styles.nameStyle}>{item.groupName}</Text>
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
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.whiteColorOpacity70}
        barStyle={'dark-content'}
      />

      <View style={styles.headerStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}>
            <BackIcon name="arrow-back" size={22} color={colors.socialpink} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: scale(16),
              color: colors.socialpink,
              fontWeight: 'bold',
            }}>
            Your Groups
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

      <FlatList
        data={userGroups}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.socialpinklight,
  },
  mainContentStyle: {
    backgroundColor: colors.whiteColorOpacity70,
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
  messageStyle: {
    fontSize: scale(10),
    color: colors.blackOpacity70,
    fontFamily: fontFamily.medium,
  },
  nameStyle: {
    fontSize: scale(13),
    color: colors.blackColor,
    // fontWeight: '500',
    fontFamily: fontFamily.semiBold,
  },
  headerStyle: {
    backgroundColor: colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateVerticalScale(12),
    marginBottom: moderateVerticalScale(12),
  },
});

export default AllGroups;
