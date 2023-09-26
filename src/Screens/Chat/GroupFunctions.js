import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Function to send a message to a group
const sendMessageToGroup = async (groupId, senderUid, text) => {
  try {
    // Create a new message document in the "messages" sub-collection of the group
    await firestore()
      .collection('groups')
      .doc(groupId)
      .collection('messages')
      .add({
        sender: senderUid,
        text: text,
        timestamp: new Date(),
        // Add other message data if needed
      });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Function to retrieve messages from a group
const getGroupMessages = async groupId => {
  try {
    // Query the "messages" sub-collection of the group to retrieve messages
    const querySnapshot = await firestore()
      .collection('groups')
      .doc(groupId)
      .collection('messages')
      .orderBy('timestamp', 'asc') // Order messages by timestamp in ascending order
      .get();

    // Extract the messages from the query snapshot
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return messages;
  } catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
  }
};

export {sendMessageToGroup, getGroupMessages};
