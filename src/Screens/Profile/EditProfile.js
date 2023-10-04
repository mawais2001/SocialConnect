import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';
import firestores, {firebase} from '@react-native-firebase/firestore';
import colors from '../../styles/colors';
import HeaderCompo from '../../Components/HeaderCompo';
import imagePath from '../../constants/imagePath';
import TextInputCompo from '../../Components/TextInputCompo';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import navigationString from '../../Navigation/navigationString';
import FastImage from 'react-native-fast-image';

function EditProfile(props) {
  const userData = auth().currentUser;
  const userDetail = props.route.params.userDetail;
  //   console.log(userData.photoURL);
  const [email, setEmail] = useState(userDetail?.email || '');
  const [address, setAddress] = useState(userDetail?.address || '');
  const [name, setName] = useState(userData?.displayName || '');
  const [profileImageUrl, setProfileImageUrl] = useState(
    userData?.photoURL || '',
  );
  const [imgData, setImgData] = useState(null);
  const [err, setErr] = useState('');

  // console.log('============userDetail START========================');
  // console.log(userDetail);
  // console.log('============userDetail END========================');
  const navigation = useNavigation();

  const handleImagePicker = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to select an image.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const response = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.images],
          copyTo: 'cachesDirectory',
        });
        // console.log(response);
        setImgData(response);
      } else {
        console.log('Storage permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatingImage = async () => {
    try {
      const ref = storage().ref(`profileImages/${userData.uid}.jpg`);
      await ref.putFile(imgData.fileCopyUri.replace('file://', ''));
      //   console.log('ref ???????? ', ref);
      const downloadURL = await ref.getDownloadURL();
      if (downloadURL.length > 2) {
        // console.log('Image is updated');
        return downloadURL;
      }
    } catch (error) {
      console.log(
        '=======Error while Updating pic for Edit Profile START=============================',
      );
      console.log(error);
      console.log(
        '========Error while Updating pic for Edit Profile END============================',
      );
      setErr('an error occur while updating Profile image');
      return null;
    }
  };

  //   const deleteOldProfileImage = async () => {
  //     try {
  //       console.log(
  //         '==========(userDetail.profilePicture URL==========================',
  //       );
  //       console.log(userDetail.profilePicture);
  //       console.log('====================================');
  //       await storage().refFromURL(userDetail.profilePicture).delete();
  //       return false;
  //     } catch (error) {
  //       console.log(
  //         '=======Error while deleting old pic for Edit Profile START=============================',
  //       );
  //       console.log(error);
  //       console.log(
  //         '========Error while deleting old pic for Edit Profile END============================',
  //       );
  //       setErr('an error occur while updating Profile');
  //       return false;
  //     }
  //   };

  const addNewProfileImage = async () => {
    try {
      const imageRef = storage().ref(
        `profileImages/${name}-${userData.uid}.jpg`,
      );
      await imageRef.putFile(imgData.fileCopyUri.replace('file://', ''));
      const downloadURL = await imageRef.getDownloadURL();
      console.log('download URL: ', downloadURL);
      if (downloadURL.length > 5) {
        return downloadURL;
      }
    } catch (error) {
      console.log(
        '===========Error while uploading New image for Edit Profile START=========================',
      );
      console.log(error);
      console.log(
        '===========Error while uploading New image for Edit Profile END=========================',
      );
      return null;
    }
  };

  const editFullProfile = async newImgUrl => {
    try {
      await userData.updateProfile({
        displayName: name,
        photoURL: newImgUrl,
      });
      await firestores().collection('users').doc(userData.uid).update({
        fullName: name,
        email: email,
        address: address,
        phone: userData.phoneNumber,
        profilePicture: newImgUrl,
      });
      //   console.log('Profile is updated completely');
      return true;
    } catch (error) {
      console.log('Error while updating full Profile: ', error);
      return false;
    }
  };

  const editPartialProfile = async () => {
    try {
      await userData.updateProfile({
        displayName: name,
      });
      await firestores().collection('users').doc(userData.uid).update({
        fullName: name,
        email: email,
        address: address,
        phone: userData.phoneNumber,
      });
      //   console.log('Profile is updated Partially!');
      return true;
    } catch (error) {
      console.log('Error in Partial updating  Profile: ', error);
      return false;
    }
  };

  const handleUpdateProfile1 = async () => {};

  const handleUpdateProfile = async () => {
    try {
      if (name.length < 2 || email.length < 8) {
        return setErr('Name and email are required to edit your profile.');
      }

      if (!imgData) {
        setErr('Updating your profile, please wait...');
        const partialProfileUpdating = await editPartialProfile();
        if (partialProfileUpdating) {
          setErr('Profile is edited successfully!');
          setTimeout(() => {
            setErr('');
          }, 3000);
          return navigation.navigate(navigationString.PROFILE);
        }
      }

      setErr('Updating your profile, please wait...');

      const updateImgRes = await updatingImage();

      if (updateImgRes && updateImgRes.length > 2) {
        const editFullProfileResponse = await editFullProfile(updateImgRes);

        if (editFullProfileResponse) {
          setErr('Profile is edited successfully!');
          setTimeout(() => {
            setErr('');
          }, 3000);
          return navigation.navigate(navigationString.PROFILE);
        } else {
          setErr('Failed to edit profile. Please try again later.');
        }
      } else {
        setErr('Failed to update the image.');
      }
    } catch (error) {
      console.log(
        '==========ERROR while updating Profile in handleUpdateProfile==========================',
      );
      console.log(error);
      console.log(
        '===========ERROR while updating Profile in handleUpdateProfile END=========================',
      );
      setErr('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.socialpinklight}
        barStyle={'dark-content'}
      />
      <View
        style={{
          backgroundColor: colors.socialpinklight,
          borderBottomLeftRadius: moderateScale(50),
          borderBottomRightRadius: moderateScale(50),
        }}>
        <View style={styles.headerSyle}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}>
            <Image
              source={imagePath.icBack}
              style={{tintColor: colors.socialpink}}
            />
          </TouchableOpacity>

          <Text style={styles.headerTextStyle}>Edit Profile</Text>

          <TouchableOpacity activeOpacity={0.3} onPress={handleUpdateProfile}>
            <Text style={styles.headerTextStyle1}>Save</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginVertical: moderateVerticalScale(25),
          }}>
          {imgData ? (
            <TouchableOpacity activeOpacity={0.5} onPress={handleImagePicker}>
              <FastImage
                style={styles.image}
                source={{uri: imgData.uri, priority: FastImage.priority.normal}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.5} onPress={handleImagePicker}>
              <FastImage
                style={styles.image}
                source={{
                  uri: userData.photoURL
                    ? userData.photoURL
                    : imagePath.avatarImage,
                  priority: FastImage.priority.normal,
                }}
              />
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity activeOpacity={0.5}>
            <Image
              style={styles.image}
              source={{
                uri: userData.photoURL
                  ? userData.photoURL
                  : imagePath.avatarImage,
              }}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: moderateScale(24),
            marginTop: moderateVerticalScale(22),
          }}>
          <View style={{marginBottom: moderateScale(16)}}>
            <Text style={styles.inputTextStyle}> Name </Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter Name"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>

          <View style={{marginBottom: moderateScale(16)}}>
            <Text style={styles.inputTextStyle}> Email </Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View style={{marginBottom: moderateScale(16)}}>
            <Text style={styles.inputTextStyle}> Phone </Text>
            <TextInput
              style={[styles.inputStyle, {color: colors.grayColor}]}
              placeholder="Enter Phone"
              value={userData.phoneNumber}
              editable={false}
            />
          </View>

          <View style={{marginBottom: moderateScale(16)}}>
            <Text style={styles.inputTextStyle}> Address </Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter Address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>
          {err.length > 2 ? <Text style={styles.error}> {err} </Text> : null}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  headerSyle: {
    flexDirection: 'row',
    marginTop: moderateVerticalScale(16),
    paddingHorizontal: moderateScale(20),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextStyle: {
    color: colors.socialpink,
    fontSize: scale(18),
    fontWeight: '600',
  },
  headerTextStyle1: {
    color: colors.socialpink,
    fontSize: scale(15),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  image: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray4,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputTextStyle: {
    fontSize: scale(14),
    color: colors.gray2,
  },
  error: {
    color: colors.redColor,
    fontSize: scale(14),
    textAlign: 'center',
    // marginTop: moderateVerticalScale(10),
  },
});

export default EditProfile;
