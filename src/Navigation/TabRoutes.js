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
import AddIcon from 'react-native-vector-icons/MaterialIcons';
import HomeIcon from 'react-native-vector-icons/Ionicons';
import SearchIcon from 'react-native-vector-icons/FontAwesome';
import SearchIcontwo from 'react-native-vector-icons/Feather';

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
              // <Image
              //   source={imagePath.firstActiveIcon}
              //   style={{tintColor: colors.socialpink}}
              // />
              <HomeIcon name="home" color={colors.socialpink} size={25} />
            ) : (
              // <Image
              //   source={imagePath.firstInActiveIcon}
              //   style={{tintColor: colors.grayColor}}
              // />
              <HomeIcon
                name="home-outline"
                color={colors.grayColor}
                size={25}
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
              // <Image
              //   source={imagePath.secondActiveIcon}
              //   style={{tintColor: colors.socialpink}}
              // />
              <SearchIcon name="search" color={colors.socialpink} size={25} />
            ) : (
              <SearchIcontwo name="search" color={colors.grayColor} size={25} />
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
              // <Image
              //   source={imagePath.thirdActiveIcon}
              //   style={{tintColor: 'red'}}
              // />
              <AddIcon name="add-circle" color={colors.socialpink} size={34} />
            ) : (
              <AddIcon
                name="add-circle-outline"
                color={colors.grayColor}
                size={34}
              />
              // <Image
              //   source={imagePath.thirdInActiveIcon}
              //   style={{tintColor: colors.grayColor, height: 22, width: 22}}
              // />
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
              <HomeIcon
                name="notifications"
                color={colors.socialpink}
                size={25}
              />
            ) : (
              <HomeIcon
                name="notifications-outline"
                color={colors.grayColor}
                size={25}
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
              <SearchIcon name="user" color={colors.socialpink} size={25} />
            ) : (
              // <Image
              //   source={imagePath.fifthActiveIcon}
              //   style={{tintColor: colors.socialpink}}
              // />
              // <SearchIcon name="user-o" color={colors.grayColor} size={25} />
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
