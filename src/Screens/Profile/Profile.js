import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import LogOut from 'react-native-vector-icons/MaterialIcons';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import colors from '../../styles/colors';
import useAuths from '../../social/allcomponents/auth/useAuths';
import firestores from '@react-native-firebase/firestore';
import Edit from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import fontFamily from '../../styles/fontFamily';
import FastImage from 'react-native-fast-image';

function Profile(props) {
  const [udetail, setUDetail] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const userData = auth().currentUser;
  // console.log(userData.photoURL);
  const {user, setUser} = useAuths();

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const logoutFunction = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch(error => console.log(error));
  };
  const handleLogout = () => {
    try {
      Alert.alert('Logout', 'Are you sure to Logout!', [
        {
          text: 'Yes',
          onPress: logoutFunction,
        },
        {
          text: 'No',
        },
      ]);
    } catch (error) {
      console.log('============ERROR WHILE LOG OUT========================');
      console.log(error);
      console.log('====================================');
    }
  };

  const getUserData = async () => {
    try {
      const udata = await firestores()
        .collection('users')
        .doc(userData.uid)
        .get();
      if (udata) {
        setUDetail(udata);
        setUserDataLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <FastImage
          style={styles.profileImageStyle}
          source={{
            uri: userData.photoURL
              ? userData.photoURL
              : 'https://cdn2.vectorstock.com/i/1000x1000/17/61/male-avatar-profile-picture-vector-10211761.jpg',
            priority: FastImage.priority.normal,
          }}
        />
        <Text style={styles.profileNameStyle}>{userData.displayName}</Text>
      </View>
      {/* <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btn}
        onPress={() =>
          navigation.navigate('EditProfile', {userDetail: udetail?._data})
        }>
        <View style={{flexDirection: 'row'}}>
          <Edit name="edit" size={25} color={colors.socialpink} />
          <Text style={styles.text}>Edit Profile</Text>
        </View>
      </TouchableOpacity> */}
      {userDataLoading ? ( // Show activity indicator while loading
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color={colors.socialpink}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btn}
          onPress={() =>
            navigation.navigate('EditProfile', {userDetail: udetail?._data})
          }>
          <View style={{flexDirection: 'row'}}>
            <Edit name="edit" size={25} color={colors.socialpink} />
            <Text style={styles.text}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity activeOpacity={0.5} style={styles.btn}>
        <View style={{flexDirection: 'row'}}>
          <Edit name="notifications-none" size={27} color={colors.socialpink} />
          <Text style={styles.text}>Notification</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.5} style={styles.btn}>
        <View style={{flexDirection: 'row'}}>
          <Edit name="help-outline" size={27} color={colors.socialpink} />
          <Text style={styles.text}>Help</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.btn}
        onPress={handleLogout}>
        <View style={{flexDirection: 'row'}}>
          <Edit name="logout" size={27} color={colors.socialpink} />
          <Text style={styles.text}>Logout</Text>
        </View>
      </TouchableOpacity>

      {/* <Text style={styles.profileNameStyle}>{userData.phoneNumber} </Text> */}
      {/* {
                !!udetail ? <View>
                    <Text style={styles.profileNameStyle}> {udetail._data.address} </Text>
                    <Text style={styles.profileNameStyle}> {udetail._data.email} </Text>
                </View> : <Text>Address and Email is missing!</Text>
            } */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  profileImageStyle: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  head: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(24),

    // backgroundColor: 'red'
  },
  profileNameStyle: {
    fontSize: scale(17),
    color: colors.socialpink,
    // fontWeight: 'bold',
    marginTop: moderateVerticalScale(10),
    fontFamily: fontFamily.semiBold,
  },
  logoutStyle: {
    fontSize: scale(16),
    color: colors.redColor,
    fontWeight: '600',
  },
  btn: {
    marginHorizontal: moderateScale(22),
    backgroundColor: colors.socialpinklight,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateVerticalScale(14),
    borderRadius: moderateScale(14),
    marginBottom: moderateVerticalScale(20),
  },
  text: {
    color: colors.socialpink,
    fontSize: scale(14),
    fontFamily: fontFamily.semiBold,
    // fontWeight: '500',
    marginLeft: moderateScale(18),
  },
});

export default Profile;
