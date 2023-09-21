import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {moderateScaleVertical} from '../../styles/responsiveSize';
import ButtonCompo from '../../Components/ButtonCompo';
import auth from '@react-native-firebase/auth';
import HeaderCompo from '../../Components/HeaderCompo';
import DocumentPicker from 'react-native-document-picker';
import firestores from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import useAuths from '../allcomponents/auth/useAuths';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function Register(props) {
  const [email, setEmail] = useState('');
  const [fullname, setFullName] = useState('');
  const [address, setAdress] = useState('');
  const [imgData, setImgData] = useState(null);
  const [regError, setRegError] = useState('');
  const [goHome, setGoHome] = useState(false);
  const [showHomeBtn, setShowHomeBtn] = useState(false);

  const navigation = useNavigation();
  const {user, setUser} = useAuths();
  const userData = auth().currentUser;
  // console.log('============userData========================');
  // console.log(userData);
  // console.log('============userData========================');

  const handleHomeScreen = () => {
    if (goHome) {
      setUser(auth().currentUser);
      // console.log("Go to HOme Screen function is run!");
      setRegError('');
    } else {
      setRegError('Enter profile details for home screen');
    }
  };

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

  const handleImageUploder = async () => {
    try {
      const imageRef = storage().ref(
        // `profileImages/${fullname}-${userData.uid}.jpg`,
        `profileImages/${userData.uid}.jpg`,
      );
      await imageRef.putFile(imgData.fileCopyUri.replace('file://', ''));
      const downloadURL = await imageRef.getDownloadURL();
      if (downloadURL) {
        return downloadURL;
      }
    } catch (error) {
      console.log(
        '=============ERROR while Uploading Profile Image START=======================',
      );
      console.log(error);
      console.log(
        '=============ERROR while Uploading Profile Image END=======================',
      );
    }
  };

  const handlerAllUserData = async imgUploadResponse => {
    try {
      await userData.updateProfile({
        displayName: fullname,
        photoURL: imgUploadResponse,
      });
      await firestores().collection('users').doc(userData.uid).set({
        fullName: fullname,
        email: email,
        address: address,
        phone: userData.phoneNumber,
        profilePicture: imgUploadResponse,
      });

      return true;
    } catch (error) {
      console.log('===========handlerAllUserData=========================');
      console.log(error);
      console.log('============handlerAllUserData========================');

      return false;
    }
  };

  const handleProfileData = async () => {
    if (!email || !fullname || !imgData) {
      return setRegError(
        'Name, Email and Profile image must be selected to create Account!',
      );
    } else {
      try {
        if (imgData) {
          setRegError('Processing Please Wait...');
          const imgUploadResponse = await handleImageUploder();
          if (imgUploadResponse) {
            const res = await handlerAllUserData(imgUploadResponse);
            if (res) {
              setRegError('Your Registration is Completed Successfully!');
              setGoHome(true);
              setShowHomeBtn(true);
            }
          }
        }
      } catch (error) {
        console.log('Error in handleProfileData function>>>>: ', error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <StatusBar
        backgroundColor={colors.socialpinklight}
        barStyle={'dark-content'}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <HeaderCompo
          style={{paddingHorizontal: moderateScale(20)}}
          iconColor={colors.blackColor}
        />
        <View style={styles.box1}>
          <Text style={styles.heading}>Welcome Back!</Text>
          <Text style={styles.heading2}>
            Give some detail to complete your profile process
          </Text>
        </View>
        <View style={styles.box2}>
          <TextInput
            style={styles.input}
            placeholder="Enter Name *"
            value={fullname}
            onChangeText={text => setFullName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email *"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Address (optional)"
            value={address}
            onChangeText={text => setAdress(text)}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            {regError.length > 0 ? (
              <Text style={styles.error}> {regError} </Text>
            ) : null}
            {/* {
                        imgData ? (<Image style={styles.img} source={{ uri: imgData.uri }} />) : (<Text style={{ textAlign: 'center', fontSize: scale(18), marginVertical: moderateVerticalScale(10) }}>No Image Selected</Text>)
                    }
                    <ButtonCompo title='Select Profile Image *' onPress={handleImagePicker} /> */}
            {!!imgData ? (
              <TouchableOpacity onPress={handleImagePicker}>
                <Image style={styles.image} source={{uri: imgData.uri}} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.postIcon}
                onPress={handleImagePicker}>
                <Icon name="image" size={70} color={'white'} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.box3}>
          {showHomeBtn ? (
            <ButtonCompo
              title="Home"
              style={{backgroundColor: colors.themeColor}}
              onPress={handleHomeScreen}
            />
          ) : (
            <ButtonCompo
              title="Register"
              onPress={handleProfileData}
              style={{backgroundColor: colors.redColor}}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.socialpinklight,
  },
  box1: {
    // backgroundColor: 'red',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  box2: {
    // backgroundColor: 'pink',
    flex: 2,
    paddingTop: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(20),
  },
  box3: {
    // backgroundColor: 'blue',
    flex: 0.3,
    alignItems: 'center',
    paddingTop: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(22),
  },
  heading: {
    fontSize: scale(20),
    color: colors.blackOpacity90,
    marginBottom: moderateScaleVertical(10),
  },
  heading2: {
    fontSize: scale(16),
    color: colors.blackOpacity70,
    textAlign: 'center',
    fontWeight: '800',
  },
  input: {
    backgroundColor: colors.whiteColor,
    borderRadius: moderateScale(18),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(14),
    fontSize: scale(16),
    color: colors.blackColor,
    marginBottom: moderateScaleVertical(20),
    borderWidth: 2,
    borderColor: colors.blackOpacity40,
    // width: '90%'
  },
  error: {
    fontSize: scale(14),
    textAlign: 'center',
    marginBottom: moderateVerticalScale(10),
    color: colors.socialpink,
    fontWeight: 'bold',
  },
  img: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
  },
  postIcon: {
    backgroundColor: colors.blackOpacity70,
    height: moderateScale(90),
    width: moderateScale(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
  },
  image: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: moderateScale(8),
  },
});

export default Register;
