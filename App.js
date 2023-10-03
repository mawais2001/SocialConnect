import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NaviManager from './src/social/socialNavigation/NaviManager';
import {
  requestUserPermission,
  notificationListner,
} from './src/Screens/Notification/notificationService';
const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListner();
  }, []);

  return (
    <View style={styles.container}>
      <NaviManager />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
