import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import {Image, StyleSheet} from 'react-native';
import * as Screens from '../Screens/index';
// import { moderateScale, width, moderateScaleVertical } from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import navigationString from './navigationString';

const BottomTab = createBottomTabNavigator();

const TabRoutes = props => {
  return (
    <BottomTab.Navigator
      tabBar={tabsProps => (
        <>
          <BottomTabBar {...tabsProps} />
        </>
      )}
      initialRouteName={navigationString.HOME}
      screenOptions={{
        headerShown: false,
        style: styles.customBottomtabsStyle,
        tabBarActiveTintColor: colors.blackColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: colors.socialpinklight,
        },
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name={navigationString.HOME}
        component={Screens.Home}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image source={imagePath.firstActiveIcon} />
            ) : (
              <Image
                source={imagePath.firstInActiveIcon}
                style={{tintColor: colors.grayColor}}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={navigationString.SEARCH}
        component={Screens.Search}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image
                source={imagePath.secondActiveIcon}
                style={{tintColor: 'red'}}
              />
            ) : (
              <Image
                source={imagePath.secondInActiveIcon}
                style={{tintColor: colors.grayColor}}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={navigationString.CREATE_POST}
        component={Screens.CreatePost}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image
                source={imagePath.thirdActiveIcon}
                style={{tintColor: 'red'}}
              />
            ) : (
              <Image
                source={imagePath.thirdInActiveIcon}
                style={{tintColor: colors.grayColor}}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={navigationString.NOTIFICATION}
        component={Screens.Notification}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image
                source={imagePath.fourthActiveIcon}
                style={{tintColor: 'red'}}
              />
            ) : (
              <Image
                source={imagePath.fourthInActiveIcon}
                style={{tintColor: colors.grayColor}}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={navigationString.PROFILE}
        component={Screens.Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image
                source={imagePath.fifthActiveIcon}
                style={{tintColor: 'red'}}
              />
            ) : (
              <Image
                source={imagePath.fifthInActiveIcon}
                style={{tintColor: colors.grayColor}}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  customBottomtabsStyle: {},
});

export default TabRoutes;
