import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneNumber from '../socialScreens/PhoneNumber';
import Register from '../socialScreens/Register';
import OtpVerify from '../socialScreens/OtpVerify';

const Stack = createNativeStackNavigator();
function AuthNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PhoneNumber"
        component={PhoneNumber}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpVerify"
        component={OtpVerify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
