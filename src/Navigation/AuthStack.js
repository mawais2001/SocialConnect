import React from "react";
import navigationString from "./navigationString";
import * as Screens from '../Screens/index';

export default function (Stack) {
    return (
        <>

            <Stack.Screen
                name={navigationString.INITAIL_SCREEN}
                component={Screens.IntialScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name={navigationString.LOGIN}
                component={Screens.Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name={navigationString.SIGNUP}
                component={Screens.Signup}
                options={{ headerShown: false }}
            />


        </>
    );
}