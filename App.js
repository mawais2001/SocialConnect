import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Routes from './src/Navigation/Routes';
import { Provider } from 'react-redux';
import GetFetchApi from './App/mycomponents/GetFetchApi';
import AxiosApi from './App/mycomponents/AxiosApi';
import JsonFirst from './App/mycomponents/JsonFirst';
import CrudApi from './App/mycomponents/CrudApi';
import WorkOut from './App/UiDesign/WorkOut';
import NaviWrapperWorkOut from './App/UiDesign/NaviWrapperWorkOut';
import TailWindFirst from './App/tailWind/TailWindFirst';
import TextTailWind from './tailwind/food/TextTailWind';
import InputWork from './App/UiDesign/InputWork';
import PhoneNumber from './src/social/socialScreens/PhoneNumber';
import OtpVerify from './src/social/socialScreens/OtpVerify';
import Register from './src/social/socialScreens/Register';
import SocialNavigationWrapper from './src/social/socialNavigation/SocialNavigationWrapper';
import NaviManager from './src/social/socialNavigation/NaviManager';
import Other from './src/social/socialScreens/Other';

const App = () => {
  // <Routes />
  //<GetFetchApi />
  // <AxiosApi />
  // <JsonFirst />
  // <CrudApi />
  // <NaviWrapperWorkOut />
  // <PhoneNumber />
  //  <OtpVerify />

  // <SocialNavigationWrapper />
  // <NaviManager />
  // <Other />
  return (
    <View style={styles.container}>
      <NaviManager />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
