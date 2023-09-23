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
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import TextInputCompo from '../../Components/TextInputCompo';
import ButtonCompo from '../../Components/ButtonCompo';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import fontFamily from '../../styles/fontFamily';

function PhoneNumber(props) {
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const loginWithPhone = async phone => {
    try {
      setIsLoading(true);
      const mobile = '+' + phone;
      let response = await auth().signInWithPhoneNumber(mobile);
      // console.log(response);
      // console.log('===============confirm=====================');
      // console.log(response.verificationId);
      // console.log('===============confirm=====================');
      setIsLoading(false);
      navigation.navigate('OtpVerify', {
        response: response.verificationId,
      });
      // props.navigation.navigate("OtpVerify", { phone: response })
    } catch (error) {
      // console.log(error);
      if (error.code === 'auth/invalid-phone-number') {
        // Handle the case of an invalid phone number format
        setErr(
          'Invalid phone number format. Please enter a valid phone number with country code format.',
        );
      } else if (error.code === 'auth/network-request-failed') {
        setErr('Please Check your internet connection!');
      } else {
        // Handle other errors
        console.error('Error logging in with phone number:', error);
      }
    }
  };

  const handleSubmit = () => {
    try {
      if (!phone.length > 0) {
        return setErr('Empty field is not allowed!');
      }
      if (phone.length > 14 || phone.length < 11) {
        return setErr('Enter valid phone number');
      }
      console.log('i am click');
      setErr('');
      loginWithPhone(phone);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar
        backgroundColor={colors.socialpinklight}
        barStyle={'dark-content'}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.box1}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={imagePath.phonehand}
            />
          </View>

          <View style={styles.box2}>
            <Text style={styles.heading}>Enter Your Phone Number</Text>
            <Text style={styles.heading2}>
              Plz Enter your phone number with country code!
            </Text>
          </View>
          <View style={styles.box3}>
            <TextInput
              placeholder="Enter Phone Number"
              placeholderTextColor={colors.blackColor}
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={text => setPhone(text)}
            />
            {err.length > 0 ? <Text style={styles.error}> {err} </Text> : null}
            {isLoading ? (
              <ActivityIndicator
                style={{marginBottom: moderateVerticalScale(6)}}
                size={30}
                color={colors.socialpink}
              />
            ) : null}
            <ButtonCompo
              title="Next"
              style={{backgroundColor: colors.redColor}}
              onPress={handleSubmit}
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
    marginBottom: moderateVerticalScale(10),
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
    marginBottom: moderateVerticalScale(20),
    width: '90%',
    fontFamily: fontFamily.regular,
    justifyContent: 'center',
  },
  error: {
    fontSize: scale(14),
    textAlign: 'center',
    marginBottom: moderateVerticalScale(10),
    color: colors.socialpink,
    fontWeight: 'bold',
    fontFamily: fontFamily.medium,
  },
});

export default PhoneNumber;
