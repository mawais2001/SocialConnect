import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import TextInputCompo from '../../Components/TextInputCompo';
import ButtonCompo from '../../Components/ButtonCompo';
import {useNavigation} from '@react-navigation/native';
import navigationString from '../../Navigation/navigationString';
import HeaderCompo from '../../Components/HeaderCompo';
import DocumentPicker from 'react-native-document-picker';
import auth from '@react-native-firebase/auth';
import firestores from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

function EditPost(props) {
  const postData = props.route.params.postData;
  const [title, setTitle] = useState(postData.title);
  const [description, setDescription] = useState(postData.description);
  const [err, setErr] = useState('');
  const [imgData, setImgData] = useState(null);
  const [imgUrl, setImgUrl] = useState(postData.imageUrl);
  const [isloading, setIsLoading] = useState(false);

  const loggedUserId = props.route.params.loggedUserId;
  const navigation = useNavigation();
  const userData = auth().currentUser;

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
          Your Post is Updating Please wait...
        </Text>
        <ActivityIndicator size="large" color={colors.socialpink} />
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

  const deleteOldPostImage = async () => {
    try {
      await storage().refFromURL(postData.imageUrl).delete();
      console.log('old image is deleted for update post!');
      return true;
    } catch (error) {
      console.log(
        '=======Error while deleting old pic for update post START=============================',
      );
      console.log(error);
      console.log(
        '========Error while deleting old pic for update post END============================',
      );
      return false;
    }
  };

  const addNewPostImage = async () => {
    try {
      const timestamp = Date.now();
      const postId = `post_${timestamp}`;
      const imageRef = storage().ref(`postImages/${postId}.jpg`);
      await imageRef.putFile(imgData.fileCopyUri.replace('file://', ''));
      const downloadURL = await imageRef.getDownloadURL();

      if (downloadURL.length > 5) {
        return downloadURL;
      }
    } catch (error) {
      console.log(
        '===========Error while uploading New image for Updating Post START=========================',
      );
      console.log(error);
      console.log(
        '===========Error while uploading New image for Updating Post END=========================',
      );
      return null;
    }
  };

  const updateFullPost = async newImgUrl => {
    try {
      await firestores()
        .collection('posts')
        .doc(userData.uid)
        .collection('allposts')
        .doc(postData.postId)
        .update({
          title: title,
          description: description,
          imageUrl: newImgUrl,
          time: new Date(),
          timestamp: new Date().getTime().toString(),
        });
      console.log('Post is updated completely');
      setIsLoading(false);
      setErr('');
      return true;
    } catch (error) {
      console.log('Error while updating full post: ', error);
      return false;
    }
  };

  const updatePartialPost = async () => {
    try {
      await firestores()
        .collection('posts')
        .doc(userData.uid)
        .collection('allposts')
        .doc(postData.postId)
        .update({
          title: title,
          description: description,
          time: new Date(),
          timestamp: new Date().getTime().toString(),
        });
      console.log('Post is updated partially!');
      setIsLoading(false);
      setErr('');
      return true;
    } catch (error) {
      console.log('Error while updating partial post: ', error);
      return false;
    }
  };

  const handleEdit = async () => {
    try {
      if (title.length > 1) {
        setErr('Updating your post please wait...');
        setIsLoading(true);
        if (imgData) {
          const delrespon = await deleteOldPostImage();
          if (delrespon) {
            const newImgRes = await addNewPostImage();
            if (newImgRes.length > 5) {
              const fullpostRes = await updateFullPost(newImgRes);
              if (fullpostRes) {
                navigation.navigate(navigationString.HOME);
              }
            }
          }
        } else if (!imgData) {
          setIsLoading(true);
          const partialPostRes = await updatePartialPost();
          if (partialPostRes) {
            navigation.navigate(navigationString.HOME);
          }
        } else {
          setErr('Image is not Selected!');
        }
      } else {
        setErr('Title and image are required to Edit Image!');
      }
    } catch (error) {
      console.log('Error in updating post: ', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <HeaderCompo iconColor={colors.socialpink} />
          <Text
            style={{
              fontSize: scale(14),
              textAlign: 'center',
              color: colors.socialpink,
            }}>
            Edit Post
          </Text>

          {imgData ? (
            <TouchableOpacity
              style={styles.editImageStyle}
              onPress={handleImagePicker}>
              <Image
                style={{
                  width: moderateScale(90),
                  height: moderateScale(90),
                  borderRadius: moderateScale(8),
                }}
                source={{uri: imgData.uri}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editImageStyle}
              onPress={handleImagePicker}>
              <Image
                style={{
                  width: moderateScale(90),
                  height: moderateScale(90),
                  borderRadius: moderateScale(8),
                }}
                source={{uri: imgUrl}}
              />
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity style={styles.editImageStyle}>
                <Image style={{ width: moderateScale(90), height: moderateScale(90), borderRadius: moderateScale(8) }} source={{ uri: postData.imageUrl }} />
            </TouchableOpacity> */}
          <TextInputCompo
            placeholder="Enter Title *"
            value={title}
            onChangeText={text => setTitle(text)}
            clearIcon={title.length > 0 ? 'Clear' : ''}
            onPressClear={() => setTitle('')}
            textStyle={{color: colors.blackColor}}
            placeholderTextColor={colors.socialpink}
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
            clearIcon={description.length > 0 ? 'Clear' : ''}
            onPressClear={() => setDescription('')}
            textStyle={{color: colors.blackColor}}
            placeholderTextColor={colors.socialpink}
          />

          {err.length > 1 ? (
            <Text
              style={{
                fontSize: scale(16),
                color: colors.redColor,
                textAlign: 'center',
              }}>
              {' '}
              {err}{' '}
            </Text>
          ) : null}

          <View
            style={{
              alignItems: 'center',
              marginTop: moderateVerticalScale(10),
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: moderateVerticalScale(30),
            }}>
            <ButtonCompo title="Edit" onPress={handleEdit} />
            {/* <ButtonCompo title='Home' onPress={() => navigation.navigate(navigationString.HOME)} /> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.wlight,
    paddingHorizontal: moderateScale(20),
  },
  editImageStyle: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.themeColor,
    marginVertical: moderateVerticalScale(12),
  },
});

export default EditPost;
