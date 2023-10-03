import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

const getAllTokens = async () => {
  try {
    const currentUserUid = auth().currentUser.uid;
    const snapshot = await firestore().collection('fcmtoken').get();
    const tokens = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      if (doc.id !== currentUserUid) {
        if (data.token) {
          tokens.push(data.token);
        }
      }
      // if (data.token) {
      //   tokens.push(data.token);
      // }
    });

    return tokens;
  } catch (error) {
    console.error('Error getting tokens:', error);
    return [];
  }
};

const sendTOAllNotification = async (tokens, title, picUrl) => {
  const notificationData = {
    data: {},
    // notification: {
    //   body: 'Click to Open Post',
    //   title: title,
    //   image:
    //     'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg',
    // },

    notification: {
      body: 'Click to Open Post',
      title: title,
      image: picUrl,
    },

    // android: {
    //   notification: {
    //     click_action: 'FLUTTER_NOTIFICATION_CLICK',
    //     priority: 'high',
    //     sound: 'default',
    //     style: 'bigPicture', // Use bigPicture style for image notification
    //     bigPicture:
    //       'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg', // URL to the image
    //   },
    // },

    // android: {
    //   notification: {
    //     image:
    //       'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg',
    //   },
    // },

    android: {
      notification: {
        imageUrl: picUrl,
      },
    },
  };

  // Iterate through each token and send a notification separately
  for (const token of tokens) {
    const data = {
      ...notificationData,
      to: token,
    };

    try {
      const response = await axios.post(
        'https://fcm.googleapis.com/fcm/send',
        data,
        {
          headers: {
            Authorization:
              'key=AAAAvg90qAM:APA91bGjqiQptws6bs8Ey5-a3lKzM8C-e8G8IkfzyWzSB-Ujp5YemRlsWyCXn5A9nuf9VZCuYQfj31fwVZVtJwmSYxKEKPxghWykJteJlQyD51Ptx3x1ICjxvjZ4tqQmDLefTewe_ire', // Replace with your server key
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Notification sent to', token, 'Response:', response.data);
    } catch (error) {
      console.error('Error sending notification to', token, 'Error:', error);
    }
  }
};

const handleNotification = async (title, picUrl) => {
  const allTokens = await getAllTokens();
  console.log(allTokens);
  console.log(allTokens.length);
  if (allTokens.length > 0) {
    sendTOAllNotification(allTokens, title, picUrl);
  }
};

async function getAllUsersUid() {
  try {
    const currentUserUid = auth().currentUser.uid;
    const snapshot = await firestore().collection('users').get();
    const userUids = [];

    snapshot.forEach(doc => {
      const userData = doc.id;
      if (userData !== currentUserUid) {
        userUids.push(userData);
      }
    });

    return userUids;
  } catch (error) {
    console.error('Error fetching user UIDs:', error);
    return [];
  }
}

async function StoreNotification(postId, postData) {
  try {
    const allUids = await getAllUsersUid(); // Assuming this function returns an array of user IDs (uids).
    const userId = auth().currentUser.uid;
    const userName = auth().currentUser.displayName;
    const timestamp = new Date();

    // Create a single batch object outside of the loop
    const batch = firestore().batch();

    for (const uid of allUids) {
      const notificationData = {
        postId: postId,
        postData: postData,
        text: 'added new post',
        userId: userId,
        userName: userName,
        time: timestamp,
      };

      const userNotificationRef = firestore()
        .collection('notification')
        .doc(uid)
        .collection('allnotifications')
        .doc(); // Auto-generate a document ID

      batch.set(userNotificationRef, notificationData);
    }
    await batch.commit();
  } catch (error) {
    console.error('Error storing notification:', error);
  }
}

async function SendNotificationAll({title, picUrl, postId, postData}) {
  console.log('i am calling in Send notification to all', title);
  await handleNotification(title, picUrl);
  await StoreNotification(postId, postData);
}

export default SendNotificationAll;
