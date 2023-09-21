import React from "react";
import navigationString from "./navigationString";
import * as Screens from '../Screens/index';
import TabRoutes from "./TabRoutes";
export default function (Stack) {
    return (
        <>

            <Stack.Screen
                name={navigationString.TAB_ROUTES}
                component={TabRoutes}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name={navigationString.HOME}
                component={Screens.Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name={navigationString.SEARCH}
                component={Screens.Search}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name={navigationString.PROFILE}
                component={Screens.Profile}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name={navigationString.CREATE_POST}
                component={Screens.CreatePost}
                options={{ headerShown: false }}
            /> */}


        </>
    );
}