import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneNumber from '../socialScreens/PhoneNumber.1';
import OtpVerify from '../socialScreens/OtpVerify';
import Register from '../socialScreens/Register';
import Home from '../socialScreens/Home';
const Stack = createNativeStackNavigator();

function SocialNavigationWrapper(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SocialNavigationWrapper;
