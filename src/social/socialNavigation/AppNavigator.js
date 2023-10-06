import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationString from '../../Navigation/navigationString';
import TabRoutes from '../../Navigation/TabRoutes';
import DetailPost from '../socialScreens/DetailPost';
import EditPost from '../../Screens/CreatePost/EditPost';
import EditProfile from '../../Screens/Profile/EditProfile';
import UserProfile from '../../Screens/UserProfile/UserProfile';
import Message from '../../Screens/Chat/Message';
import ChatList from '../../Screens/Chat/ChatList';
import CreateGroup from '../../Screens/Chat/CreateGroup';
import AllGroups from '../../Screens/Chat/AllGroups';
import GroupChatScreen from '../../Screens/Chat/GroupChatScreen';
import Comment from '../../Screens/Comment/Comment';

const Stack = createNativeStackNavigator();
function AppNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationString.TAB_ROUTES}
        component={TabRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPost"
        component={DetailPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupChatScreen"
        component={GroupChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllGroups"
        component={AllGroups}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationString.COMMENT}
        component={Comment}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
