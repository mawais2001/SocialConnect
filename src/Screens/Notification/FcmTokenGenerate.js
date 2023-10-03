import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const getToken = async () => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const FcmTokenGenerate = async () => {
  const userUid = auth().currentUser.uid;
  const token = await getToken();
  if (token.length > 4) {
    // console.log('Token Token: ', token);

    const tokenRef = firestore().collection('fcmtoken').doc(userUid);

    // Check if the document exists
    const docSnapshot = await tokenRef.get();

    if (docSnapshot.exists) {
      // Document exists, update the token
      await tokenRef.update({token: token});
    } else {
      // Document does not exist, create a new one
      await tokenRef.set({token: token});
    }
    return true;
  }

  // const refuserToken = await firestore()
  //   .collection('fcmtoken')
  //   .doc(userUid)
  //   .set({
  //     token: token,
  //   });
  // console.log('response is: ', refuserToken);
};

export default FcmTokenGenerate;
