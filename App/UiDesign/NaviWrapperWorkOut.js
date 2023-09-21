import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import InitWorkOut from './InitWorkOut';
import WorkOut from './WorkOut';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailWorkOut from './DetailWorkOut';
import FavWorkout from './FavWorkout';
import ImageWorkout from './ImageWorkout';
import NewWorkOutLogin from './NewWorkOutLogin';

const Stack = createNativeStackNavigator();
function NaviWrapperWorkOut(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Initial" component={InitWorkOut} />
                <Stack.Screen name="WorkOut" component={WorkOut} />
                <Stack.Screen name="DetailWorkOut" component={DetailWorkOut} />
                <Stack.Screen name="FavWorkout" component={FavWorkout} />
                <Stack.Screen name="ImageWorkout" component={ImageWorkout} />
                <Stack.Screen name="NewWorkOutLogin" component={NewWorkOutLogin} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



export default NaviWrapperWorkOut;