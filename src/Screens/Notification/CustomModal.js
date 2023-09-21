import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import colors from '../../styles/colors';
import CloseIcon from 'react-native-vector-icons/Entypo';
import ButtonCompo from '../../Components/ButtonCompo';
import {useNavigation} from '@react-navigation/native';
import firestores from '@react-native-firebase/firestore';
import navigationString from '../../Navigation/navigationString';
import auth from '@react-native-firebase/auth';
import Edit from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';
import imagePath from '../../constants/imagePath';

const CustomModal = ({
  visible,
  closeModal,
  postData,
  userData,
  onDeleteSuccess,
}) => {
  // const CustomModal = ({ visible, closeModal, postData, userData, onDeleteSuccess }) => {
  // useEffect(() => {

  // }, [visible])
  const navigation = useNavigation();
  // console.log('===========postData=========================');
  // console.log(postData);
  // console.log('=============postData=======================');

  const handerModal = () => {
    closeModal();
    navigation.navigate('EditPost', {
      postData: postData,
      loggedUserId: userData,
    });
  };

  const deletePost = () => {
    // try {
    //     await firestores().collection('posts').doc(userData).collection('allposts').doc(postData.postId).delete();
    //     console.log('Post successfully deleted!');
    //     onDeleteSuccess();
    //     closeModal();
    //     // navigation.navigate(navigationString.HOME)
    // } catch (error) {
    //     console.log('===========ERROR while Deleting the Post START=========================');
    //     console.log(error);
    //     console.log('===========ERROR while Deleting the Post END=========================');
    // }

    try {
      Alert.alert('Warning', 'Are you sure to delete this Post', [
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await firestores()
                .collection('posts')
                .doc(userData)
                .collection('allposts')
                .doc(postData.postId)
                .delete();
              console.log('Post successfully deleted!');
              await storage().refFromURL(postData.imageUrl).delete();
              console.log('Image successfully deleted!');
              onDeleteSuccess();
              closeModal();
            } catch (error) {
              console.log(
                '===========ERROR while Deleting the Post START=========================',
              );
              console.log(error);
              console.log(
                '===========ERROR while Deleting the Post END=========================',
              );
            }
          },
        },
        {
          text: 'No',
        },
      ]);
    } catch (error) {
      console.log(
        '=======ERROR while Deleting the Post START=============================',
      );
      console.log(error);
      console.log(
        '=======ERROR while Deleting the Post END=============================',
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={{alignItems: 'flex-end'}}>
            <CloseIcon
              name="circle-with-cross"
              size={32}
              color={colors.socialpink}
              onPress={closeModal}
            />
          </TouchableOpacity>
          {/* <Text style={styles.modalTitle}>Custom Modal</Text>
                    <Text>POST User ID: {postData.userId}</Text>
                    <Text>User uid: {auth().currentUser.uid}</Text> */}
          {postData.userId === userData ? (
            <View style={{marginVertical: moderateVerticalScale(10)}}>
              {/* <ButtonCompo title='Edit' style={{ backgroundColor: colors.wgray }} onPress={handerModal} /> */}
              <View activeOpacity={0.5} style={styles.editSyle}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={handerModal}>
                  <Edit name="edit" size={28} color={colors.blackColor} />
                  <Text
                    style={{
                      fontSize: scale(16),
                      color: colors.blackColor,
                      marginLeft: moderateScale(12),
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
              <View activeOpacity={0.5} style={styles.editSyle}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={deletePost}>
                  <Edit name="delete" size={28} color={colors.blackColor} />
                  <Text
                    style={{
                      fontSize: scale(16),
                      color: colors.blackColor,
                      marginLeft: moderateScale(12),
                    }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <ButtonCompo title='Delete' style={{ backgroundColor: colors.redColor, marginTop: moderateVerticalScale(10) }} onPress={deletePost} /> */}
            </View>
          ) : (
            <View
              style={{
                marginVertical: moderateVerticalScale(10),
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{flexDirection: 'row'}}>
                <Image style={styles.reportStyle} source={imagePath.report} />
                <Text
                  style={{
                    fontSize: scale(14),
                    fontWeight: '500',
                    color: colors.blackColor,
                    marginLeft: moderateScale(12),
                  }}>
                  Report
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
    width: '70%',
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: moderateVerticalScale(10),
  },
  closeButton: {
    backgroundColor: colors.redColor,
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    marginTop: moderateVerticalScale(10),
  },
  closeButtonText: {
    color: colors.whiteColor,
    fontWeight: 'bold',
  },
  editSyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(10),
  },
  reportStyle: {
    width: moderateScale(24),
    height: moderateScale(24),
    tintColor: colors.blackColor,
  },
});

export default CustomModal;
