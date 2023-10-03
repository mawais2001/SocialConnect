import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

function Notification(props) {
  const userData = auth().currentUser.uid;
  console.log(userData);
  return (
    <View style={styles.container}>
      <Text>Notification</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Notification;
