import React, { useEffect, useState } from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import AuthsContext from '../allcomponents/auth/AuthsContext';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();
function NaviManager(props) {
    const [user, setUser] = useState(null);

    const checkUser = () => {
        if (auth().currentUser !== null && auth().currentUser !== undefined) {
            setUser(auth().currentUser)
        }
    }
    useEffect(() => {
        checkUser();
        console.log("use effect");
    }, [])

    return (
        <AuthsContext.Provider value={{ user, setUser }}>
            <NavigationContainer>
                {user !== null ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        </AuthsContext.Provider>
    );
}



export default NaviManager;