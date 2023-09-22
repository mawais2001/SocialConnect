import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {moderateScaleVertical} from '../../styles/responsiveSize';
import TextInputCompo from '../../Components/TextInputCompo';
import ButtonCompo from '../../Components/ButtonCompo';
import auth from '@react-native-firebase/auth';
import HeaderCompo from '../../Components/HeaderCompo';
import {useNavigation} from '@react-navigation/native';
import useAuths from '../allcomponents/auth/useAuths';
import fontFamily from '../../styles/fontFamily';

function OtpVerify(props) {
  const [verificationCode, setVerificationCode] = useState('');
  const [otperror, setOtperror] = useState('');
  const [verify, setVerify] = useState('');
  const {response} = props.route.params;
  const navigation = useNavigation();
  const {user, setUser} = useAuths();

  // console.log("response ????????????????????????????", response);
  const handleVerifyCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        response,
        verificationCode,
      );
      await auth().signInWithCredential(credential);
      // await response.confirm(verificationCode);
      console.log('User signed in successfully.');
      setVerify('Your OTP is Verified Successfully');
      setOtperror('');
      if (auth().currentUser.photoURL) {
        setUser(auth().currentUser);
        console.log('home screen');
      } else {
        navigation.navigate('Register');
      }
      // navigation.navigate('Register');
    } catch (error) {
      // console.error('Error verifying code:', error);
      if (error.code === 'auth/invalid-verification-code') {
        // Handle the case of an invalid OTP
        setOtperror('Invalid OTP. Please enter a valid OTP.');
      } else {
        // Handle other errors
        console.error('Error verifying code:', error);
        setOtperror('An error occurred. Please try again later.');
      }
    }
  };

  const handleError = () => {
    if (verificationCode.length < 1) {
      return setOtperror('field is empty!');
    } else if (verificationCode.length > 0 && verificationCode.length < 4) {
      return setOtperror('Enter valid OTP!');
    } else {
      handleVerifyCode();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <HeaderCompo
        style={{paddingHorizontal: moderateScale(20)}}
        iconColor={colors.blackColor}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.box1}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={imagePath.otp}
            />
          </View>
          <View style={styles.box2}>
            <Text style={styles.heading}>Enter OTP</Text>
            <Text style={styles.heading2}>
              We Verify your OTP first to go next!
            </Text>
          </View>
          <View style={styles.box3}>
            <TextInput
              placeholder="Enter OTP"
              placeholderTextColor={colors.blackColor}
              style={styles.input}
              keyboardType="phone-pad"
              value={verificationCode}
              onChangeText={text => setVerificationCode(text)}
            />
            {otperror.length > 0 ? (
              <Text style={styles.error}> {otperror} </Text>
            ) : null}
            {verify.length > 0 ? (
              <Text style={styles.verify}> {verify} </Text>
            ) : null}
            <ButtonCompo
              title="Verify"
              style={{backgroundColor: colors.redColor}}
              onPress={handleError}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.socialpinklight,
  },
  image: {
    width: moderateScale(180),
    height: moderateScale(180),
    borderRadius: moderateScale(180 / 2),
  },
  box1: {
    // backgroundColor: 'red',
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    // backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  box3: {
    // backgroundColor: 'blue',
    flex: 1.3,
    alignItems: 'center',
    paddingHorizontal: moderateScale(22),
  },
  heading: {
    fontSize: scale(16),
    color: colors.blackOpacity90,
    marginBottom: moderateScaleVertical(10),
    fontFamily: fontFamily.semiBold,
  },
  heading2: {
    fontSize: scale(12),
    color: colors.blackOpacity60,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
  },
  input: {
    backgroundColor: colors.whiteColor,
    borderRadius: moderateScale(18),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(14),
    fontSize: scale(12),
    color: colors.blackColor,
    marginBottom: moderateScaleVertical(20),
    width: '90%',
    fontFamily: fontFamily.medium,
  },
  error: {
    fontSize: scale(12),
    textAlign: 'center',
    marginBottom: moderateVerticalScale(10),
    color: 'black',
    fontWeight: 'bold',
    fontFamily: fontFamily.medium,
  },
  verify: {
    fontSize: scale(12),
    textAlign: 'center',
    marginBottom: moderateVerticalScale(10),
    color: 'orange',
    fontWeight: 'bold',
    fontFamily: fontFamily.medium,
  },
});

export default OtpVerify;
