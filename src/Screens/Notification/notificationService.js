import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getDeviceFcmToken();
  }
}

const getDeviceFcmToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  // console.log('old fcm token:', fcmToken);
  if (!fcmToken) {
    try {
      // const fcmToken = await messaging().getToken();
      const userUid = auth().currentUser.uid;
      const fcmtokenDoc = await firestore()
        .collection('fcmtoken')
        .doc(userUid)
        .get();
      if (fcmtokenDoc.exists) {
        const fcmToken = fcmtokenDoc.data().token;
        await AsyncStorage.setItem('fcmToken', fcmToken);
        // console.log('new fcm token:', fcmToken);
      } else {
        const fcmToken = await messaging().getToken();
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  messaging().onMessage(async remoteMessage => {
    console.log('Notification foreground:', remoteMessage.notification);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //   setLoading(false);
    });
};
