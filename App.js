import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NaviManager from './src/social/socialNavigation/NaviManager';

const App = () => {
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
