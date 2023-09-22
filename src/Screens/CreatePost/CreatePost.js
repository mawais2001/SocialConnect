import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import TextInputCompo from '../../Components/TextInputCompo';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';
import ButtonCompo from '../../Components/ButtonCompo';
import auth from '@react-native-firebase/auth';
import DocumentPicker from 'react-native-document-picker';
import firestores, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import navigationString from '../../Navigation/navigationString';

function CreatePost(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgPath, setImgPath] = useState('');
  const [imgData, setImgData] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const userData = auth().currentUser;

  const navigation = useNavigation();

  if (isloading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.socialpinklight,
        }}>
        <Text
          style={{
            fontSize: scale(16),
            color: colors.socialpink,
            marginVertical: moderateVerticalScale(10),
          }}>
          Uploading Post Please wait...
        </Text>
        <ActivityIndicator size="large" color={colors.socialblue} />
      </View>
    );
  }

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
  const handleFullPost = async downloadURL => {
    try {
      // console.log('=============Image path firestore=======================');
      // console.log(imgPath);
      // console.log('====================================');
      const udata = await firestores()
        .collection('users')
        .doc(userData.uid)
        .get();

      if (udata) {
        const userPostsRef = await firestores()
          .collection('posts')
          .doc(userData.uid)
          .collection('allposts')
          .add({
            title: title,
            description: description,
            imageUrl: downloadURL,
            time: new Date(),
            timestamp: new Date().getTime().toString(),
            userName: udata._data.fullName,
            userAddress: udata._data.address,
            userPicture: udata._data.profilePicture,
            likes: [],
          });
        const fieldName = 'testing';
        const fixedValue = 'post testing';
        await firestores()
          .collection('posts')
          .doc(userData.uid)
          .set(
            {
              [fieldName]: fixedValue,
            },
            {merge: true},
          )
          .then(() => {
            // console.log(`Field ${fieldName} added to the user's document`);
          })
          .catch(error => {
            console.error('Error adding field:', error);
          });
        // console.log('=============userPostsRef START=======================');
        // console.log(userPostsRef);
        // console.log('=============userPostsRef END=======================');
        if (userPostsRef) {
          setIsLoading(false);
          setTitle('');
          setDescription('');
          setImgData(null);
          setErr('Your Post is Uploaded Successfully!');
          setTimeout(() => {
            setErr('');
          }, 3000);
          navigation.navigate(navigationString.HOME);
        }
      }
    } catch (error) {
      console.log('============UPLOADING POST========================');
      console.log(error);
      console.log('====================================');
    }
  };

  const uploadImageFirebase = async () => {
    if (imgData) {
      try {
        const timestamp = Date.now();
        const postId = `post_${timestamp}`;
        const imageRef = storage().ref(`postImages/${postId}.jpg`);
        await imageRef.putFile(imgData.fileCopyUri.replace('file://', ''));
        const downloadURL = await imageRef.getDownloadURL();

        if (downloadURL) {
          setImgPath(downloadURL);
          handleFullPost(downloadURL);
        }
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
    }
  };

  const handlePostUpload = () => {
    try {
      if (title.length > 0 && imgData) {
        setErr('');
        setIsLoading(true);
        uploadImageFirebase();
      } else {
        return setErr('For Post image and Title must be added!');
      }
    } catch (error) {
      console.log(
        '=============Error while uploading post START=======================',
      );
      console.log(error);
      console.log(
        '=============Error while uploading post END=======================',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.main}>
          <View
            style={{
              alignItems: 'flex-start',
              marginBottom: moderateVerticalScale(12),
            }}>
            {!!imgData ? (
              <TouchableOpacity onPress={handleImagePicker}>
                <Image style={styles.image} source={{uri: imgData.uri}} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.postIcon}
                onPress={handleImagePicker}>
                <Icon name="add-box" size={50} color={colors.socialpink} />
              </TouchableOpacity>
            )}
          </View>
          <TextInputCompo
            placeholder="Enter Title *"
            value={title}
            onChangeText={text => setTitle(text)}
            placeholderTextColor={colors.socialpink}
            textStyle={{color: colors.blackColor}}
            inputStyle={{
              backgroundColor: colors.socialpinklight,
              borderWidth: 1,
              borderColor: colors.blackOpacity40,
            }}
          />
          <TextInputCompo
            placeholder="Enter Descirption (optional)"
            multiline
            value={description}
            onChangeText={text => setDescription(text)}
            inputStyle={{
              height: moderateVerticalScale(100),
              backgroundColor: colors.socialpinklight,
              borderWidth: 1,
              borderColor: colors.blackOpacity40,
            }}
            textStyle={{color: colors.blackColor}}
            placeholderTextColor={colors.socialpink}
          />
          {isloading && (
            <Text
              style={{
                fontSize: scale(16),
                color: colors.redColor,
                textAlign: 'center',
              }}>
              Uploading your post Please wait...
            </Text>
          )}
          {err.length > 1 && (
            <Text
              style={{
                fontSize: scale(16),
                color: colors.redColor,
                textAlign: 'center',
              }}>
              {' '}
              {err}{' '}
            </Text>
          )}
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom: moderateScale(20),
            }}>
            <ButtonCompo title="Post" onPress={handlePostUpload} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    marginTop: moderateVerticalScale(18),
    paddingHorizontal: moderateScale(20),
    flex: 1,
  },
  postIcon: {
    backgroundColor: colors.socialpinklight,
    height: moderateScale(90),
    width: moderateScale(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.blackOpacity40,
  },
  image: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: moderateScale(8),
  },
});

export default CreatePost;
