import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ButtonCompo from '../../Components/ButtonCompo';
import colors from '../../styles/colors';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import fontFamily from '../../styles/fontFamily';
import ThreeDotICon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import navigationString from '../../Navigation/navigationString';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

function Notification(props) {
  const [notification, setNotification] = useState([]);
  const currentUserUid = auth().currentUser.uid;
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(null);
  const [markNotification, setmarkNotification] = useState([]);
  const [clickedNotifications, setClickedNotifications] = useState([]);
  const navigation = useNavigation();

  const userData = auth().currentUser;

  // async function fetchNotifications() {
  //     try {
  //       setIsLoading(true);
  //       const userId = auth().currentUser.uid;

  //       const querySnapshot = await firestore()
  //         .collection('notifications')
  //         .doc(userId)
  //         .collection('allnotifications').orderBy('time','desc')
  //         .onSnapshot((snap)=>{
  //             const temarray = [];
  //         snap.forEach(doc => {
  //             temarray.push(doc.data());

  //         });
  //         setNotification(temarray);
  //         if (notification.length<1) {
  //             setIsEmpty(true);
  //         }
  //         })

  //     //   const notifications = [];

  //     //   querySnapshot.forEach(doc => {
  //     //     const notificationData = doc.data();
  //     //     notifications.push(notificationData);
  //     //   });

  //     //   setNotification(notifications);
  //     } catch (error) {
  //       console.error('Error fetching notifications:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   async function fetchNotifications() {
  //     try {
  //       setIsLoading(true);
  //       const userId = auth().currentUser.uid;

  //       const notiRef = firestore()
  //         .collection('notification')
  //         .doc(userId)
  //         .collection('allnotifications')
  //         .orderBy('time', 'desc');

  //       await notiRef.onSnapshot(snap => {
  //         const temarray = [];
  //         snap.forEach(doc => {
  //           temarray.push(doc.data());
  //         });
  //         setNotification(temarray);
  //         if (notification.length < 1) {
  //           setIsEmpty(true);
  //           console.log('No Notification found!');
  //         }
  //       });

  //       //   const notifications = [];

  //       //   querySnapshot.forEach(doc => {
  //       //     const notificationData = doc.data();
  //       //     notifications.push(notificationData);
  //       //   });

  //       //   setNotification(notifications);
  //       console.log('...................');
  //       console.log(notification);
  //       console.log('...................');
  //     } catch (error) {
  //       console.error('Error fetching notifications:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  // async function fetchNotifications() {
  //   try {
  //     setIsLoading(true);
  //     const userId = auth().currentUser.uid;

  //     const unsubscribe = await firestore()
  //       .collection('notifications')
  //       .doc(userId)
  //       .collection('allnotifications')
  //       .orderBy('time', 'desc')
  //       .onSnapshot(querySnapshot => {
  //         const tempArray = [];
  //         querySnapshot.forEach(doc => {
  //           tempArray.push(doc.data());
  //         });

  //         setNotification(tempArray);
  //         if (tempArray.length < 1) {
  //           setIsEmpty(true);
  //           console.log('you have not notification');
  //         }
  //       });
  //     setIsLoading(false);
  //     // Store the unsubscribe function to stop listening when needed
  //     setUnsubscribe(() => unsubscribe);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error('Error fetching notifications:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  //   async function fetchNotifications() {
  //     try {
  //       setIsLoading(true);
  //       const userId = auth().currentUser.uid;

  //       const unsubscribe = await firestore()
  //         .collection('notifications')
  //         .doc(userId)
  //         .collection('allnotifications')
  //         .orderBy('time', 'desc')
  //         .onSnapshot(querySnapshot => {
  //           const tempArray = [];
  //           querySnapshot.forEach(doc => {
  //             tempArray.push(doc.data());
  //           });

  //           setNotification(tempArray);
  //           if (tempArray.length < 1) {
  //             setIsEmpty(true);
  //             console.log('you have not notification');
  //           }
  //         });
  //       setIsLoading(false);
  //       // Store the unsubscribe function to stop listening when needed
  //       setUnsubscribe(() => unsubscribe);
  //     } catch (error) {
  //       setIsLoading(false);
  //       console.error('Error fetching notifications:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  async function fetchNotifications() {
    try {
      setIsLoading(true);
      const userId = auth().currentUser.uid;

      const notiRef = firestore()
        .collection('notification')
        .doc(userId)
        .collection('allnotifications')
        .orderBy('time', 'desc');

      notiRef.onSnapshot(snapshot => {
        const tempArray = [];
        snapshot.forEach(doc => {
          tempArray.push(doc.data());
        });
        setNotification(tempArray);

        if (tempArray.length < 1) {
          setIsEmpty(true);
          // console.log('No Notification found!');
        } else {
          setIsEmpty(false);
        }
      });

      //   console.log(notification);
      // Store the unsubscribe function to stop listening when needed
      setUnsubscribe(() => unsubscribe);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNotifications();

    // Stop listening to notifications when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.socialpinklight,
        }}>
        <ActivityIndicator size="large" color={colors.socialblue} />
      </View>
    );
  }

  const profileNaviHandler = item => {
    if (userData.uid === item.userId) {
      navigation.navigate(navigationString.PROFILE);
    } else {
      navigation.navigate(navigationString.User_Profile, {userId: item.userId});
    }
  };

  const handleListEmptyComponent = () => {
    return (
      <View>
        {isEmpty ? (
          <Text
            style={{
              marginVertical: moderateVerticalScale(12),
              fontSize: scale(16),
              color: colors.redColor,
              textAlign: 'center',
            }}>
            You have not Notification
          </Text>
        ) : (
          <ActivityIndicator size="large" color={colors.socialpink} />
        )}
      </View>
    );
  };

  //   const handleNotificationClick = item => {
  //     // Check if the notification is already clicked
  //     if (!markNotification.includes(item.postId)) {
  //       // If not clicked, mark it as clicked and update the state
  //       setmarkNotification(prevState => [...prevState, item.postId]);
  //     }
  //     // Handle navigation or any other action here
  //     navigation.navigate('DetailPost', {postData: item.postData});
  //   };

  const handleNotificationClick = async item => {
    try {
      // Check if the notification is already clicked in AsyncStorage
      const clickedIds = await AsyncStorage.getItem('clickedNotifications');
      const clickedIdsArray = clickedIds ? JSON.parse(clickedIds) : [];

      if (!clickedIdsArray.includes(item.postId)) {
        // If not clicked, mark it as clicked and update AsyncStorage
        const updatedClickedIdsArray = [...clickedIdsArray, item.postId];
        await AsyncStorage.setItem(
          'clickedNotifications',
          JSON.stringify(updatedClickedIdsArray),
        );

        // Update state with the clicked notifications
        setClickedNotifications(updatedClickedIdsArray);
        // console.log('ids list ', updatedClickedIdsArray);
      }

      // Handle navigation or any other action here
      navigation.navigate('DetailPost', {postData: item.postData});
    } catch (error) {
      // Handle error
      console.error('Error handling notification click:', error);
    }
  };

  useEffect(() => {
    const loadClickedNotifications = async () => {
      try {
        const clickedIds = await AsyncStorage.getItem('clickedNotifications');
        const clickedIdsArray = clickedIds ? JSON.parse(clickedIds) : [];
        setClickedNotifications(clickedIdsArray);
        // console.log('useEffect ', clickedIdsArray);
      } catch (error) {
        console.error('Error loading clicked notifications:', error);
      }
    };

    loadClickedNotifications();
  }, []);

  const renderItem = ({item}) => {
    // console.log('item time is: ', item.postData.time);
    const isClicked = clickedNotifications.includes(item.postId);
    const notificationColor = isClicked ? colors.whiteColor : '#FAF9F6';
    // console.log(notificationColor);
    // console.log(
    //   `Item ${item.postId} - isClicked: ${isClicked}, notificationColor: ${notificationColor}`,
    // );

    const postTime = item.postData.time.toDate();
    const currentTime = new Date();
    let formattedTime = '';
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    if (
      postTime <= currentTime &&
      postTime >=
        new Date(
          currentTime.getFullYear(),
          currentTime.getMonth(),
          currentTime.getDate(),
          0,
          0,
          0,
        )
    ) {
      formattedTime = postTime.toLocaleTimeString();
      // console.log();
    } else {
      // formattedTime = postTime.toLocaleDateString();
      formattedTime = `${postTime.getDate()} ${
        monthNames[postTime.getMonth()]
      } ${postTime.getFullYear()}`;
    }

    // console.log(formattedTime);
    return (
      <View style={styles.headStyling}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: notificationColor,
            padding: moderateScale(12),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => profileNaviHandler(item.userId)}>
              <FastImage
                style={styles.profileStyle}
                source={{
                  uri: item.postData.userPicture
                    ? item.postData.userPicture
                    : imagePath.avatar,
                  priority: FastImage.priority.normal,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingLeft: moderateScale(8),
              }}
              onPress={() => handleNotificationClick(item)}>
              {/* onPress={() =>
                navigation.navigate('DetailPost', {postData: item.postData})
              }> */}
              <Text numberOfLines={1} style={styles.profileNameStyle}>
                {item.userName ? item.userName : 'Anonymous User'}
              </Text>
              <Text numberOfLines={1} style={styles.profileDescStyle}>
                {item.text ? item.text : 'Anonymous Notification'}
                {` at  ${formattedTime}`}
              </Text>
              <View />
            </TouchableOpacity>
          </View>
          <View>
            <ThreeDotICon
              name="dots-horizontal"
              size={25}
              color={colors.blackColor}
              // onPress={handlePress}
            />
          </View>
        </View>
      </View>
    );
  };

  // console.log('clickedNotifications: ', clickedNotifications);

  return (
    <View style={styles.container}>
      <View style={styles.headerSyle}>
        <View style={styles.headingContainerStyle}>
          <Text style={styles.headingStyle}>Notification</Text>
          <SearchIcon name="search" size={20} color={colors.blackColor} />
        </View>
      </View>
      <FlatList
        data={notification}
        renderItem={renderItem}
        // renderItem={({item}) => (
        //   <View>
        //     <Text>{item.postData.title}</Text>
        //     <Text>{item.text}</Text>
        //   </View>
        // )}
        keyExtractor={item => item.postId} // Use a unique identifier as the key
        ListEmptyComponent={handleListEmptyComponent}
        ItemSeparatorComponent={<View style={styles.bottomStyle} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  headerSyle: {
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateVerticalScale(20),
    backgroundColor: colors.socialpinklight,
    marginBottom: moderateVerticalScale(12),
    borderBottomRightRadius: moderateScale(30),
    borderBottomLeftRadius: moderateScale(30),
  },
  headingContainerStyle: {
    // backgroundColor: 'red',
    marginBottom: moderateVerticalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingStyle: {
    fontSize: scale(16),
    color: colors.blackColor,
    fontFamily: fontFamily.semiBold,
  },
  profileStyle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    resizeMode: 'cover',
  },
  profileNameStyle: {
    fontSize: scale(15),
    color: colors.blackColor,
    fontFamily: fontFamily.regular,
  },
  profileDescStyle: {
    fontSize: scale(10),
    color: colors.blackOpacity70,
    fontFamily: fontFamily.medium,
  },
  headStyling: {
    flex: 1,
    paddingHorizontal: moderateScale(22),
  },
  bottomStyle: {
    marginVertical: moderateVerticalScale(4),
  },
});

export default Notification;
