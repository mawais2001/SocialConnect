import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Octicons';
import MyIcon from 'react-native-vector-icons/Ionicons';
import Like from 'react-native-vector-icons/AntDesign';
import Comment from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-vector-icons/Entypo';
import colors from '../../styles/colors';
import dummyData from '../../social/static/dummyData';
import ThreeDotICon from 'react-native-vector-icons/MaterialCommunityIcons';
import { height } from '../../styles/responsiveSize';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import navigationString from '../../Navigation/navigationString';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import imagePath from '../../constants/imagePath';
import CustomModal from './CustomModal';

function Notification(props) {
    const [postList, setPostList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // const [udetail, setUDetail] = useState({});
    const [update, setUpdate] = useState()
    const navigation = useNavigation();
    const userData = auth().currentUser;
    const isFocused = useIsFocused()

    const getMyPostsData = async () => {
        const allPostsArray = [];
        // let userId = ""
        firestore().collection('posts')
            .onSnapshot(snap => {
                snap.forEach(doc => {
                    console.log("user id before: ", doc.id);
                    firestore().collection('posts').doc(doc.id).collection('allposts')
                        .orderBy("time", 'desc')
                        .onSnapshot(finalDoc => {
                            var lenght__ = 0
                            var finalLength = finalDoc.size
                            finalDoc.forEach(postData => {
                                const postDataInside = postData.data();
                                const postId = postData.id;
                                console.log("user id After: ", doc.id);
                                if (postDataInside) {
                                    lenght__ = lenght__ + 1
                                    allPostsArray.push({ postId, userId: doc.id, ...postDataInside });
                                }
                            })
                            if (lenght__ === finalLength) {
                                // console.log('==============allPostsArray======================');
                                // console.log(allPostsArray);
                                // console.log('===============allPostsArray=====================');
                                setPostList(allPostsArray);
                            }
                        })
                })
            })


        // const alldocs = await postdata.get();

        // // if (alldocs.size === 1) {
        // //     console.log("only one document Notification");
        // // }

        // const unsubscribePromises = [];

        // alldocs.forEach((userDoc) => {
        //     console.log("hre___", userDoc)


        //     const userId = userDoc.id;
        //     const allpostsRef = firestore().collection('posts').doc(userId).collection('allposts');

        //     // Use a real-time listener to listen for updates to the 'allposts' collection
        //     const unsubscribe = allpostsRef.onSnapshot((querySnapshot) => {
        //         querySnapshot.forEach((postDoc) => {
        // const postDataInside = postDoc.data();
        // const postId = postDoc.id;
        // // console.log("Post id is: ", postId);
        // // console.log("user id is: ", userId);

        // if (postDataInside) {
        //     allPostsArray.push({ postId, userId, ...postDataInside });
        // }
        //         });

        //         // Sort the array by the timestamp in descending order to display the latest posts on top
        //         allPostsArray.sort((a, b) => b.time - a.time);

        //         // Update the state with the sorted array outside the loop
        //         setPostList(allPostsArray);
        //     });

        //     unsubscribePromises.push(unsubscribe); // Store the unsubscribe function
        // });

        // // Wait for all unsubscribe promises to complete before returning
        // await Promise.all(unsubscribePromises);
    }


    // const customModalHandler = () => {
    //     <Modal
    //         animationType='fade'
    //         transparent={true}
    //         visible={showModal}
    //     >
    //         <View style={{ flex: 1 }}>
    //             <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
    //                 <View style={styles.modalStyle}>
    //                     <View style={{ alignItems: 'flex-end' }}>
    //                         <Share name="circle-with-cross" size={32} color={colors.redColor} onPress={() => setShowModal(false)} />
    //                     </View>
    //                     <View>
    //                         <Text> Logged in User uid is: {item.userId} and post user id is: {item.userId} </Text>
    //                         {
    //                             userData.uid.toString() === item.userId.toString() ? <Text>Update</Text> : <Text>Report</Text>
    //                         }
    //                         {/* <Text>
    //                                         {update ? 'Update' : 'Report'}
    //                                     </Text> */}
    //                     </View>
    //                 </View>
    //             </View>

    //             <View style={{ flex: 1 }}>

    //             </View>
    //         </View>
    //     </Modal>
    // }

    const customModalHandler = (item) => {
        setSelectedItem(item); // Set the selected item when the button is pressed
        setShowModal(!showModal); // Show the modal
    };

    const renderItem = ({ item, index, customModalHandler }) => {

        const handlePress = () => {
            console.log('object');
            // setSelectedItem(item); // Set the selected item when the button is pressed
            // setShowModal(true); // Show the modal
            customModalHandler(item);
        };
        // console.log('=============item is here=======================');
        // console.log(item.userId);
        // console.log('==============item item======================');
        // const timestamp = item.time.toDate(); // Convert Firestore Timestamp to JavaScript Date
        // const timestamp = item.time ? item.time.toDate().toDateString() : '';
        // const formattedTime = timestamp.toDateString();  // Format the Date as a string
        const timestamp = item.time;
        let formattedTime = '';

        if (timestamp) {
            const dateObject = timestamp.toDate();
            if (dateObject instanceof Date && !isNaN(dateObject)) {
                formattedTime = dateObject.toDateString();
            }
        }

        return (
            <View style={styles.post1}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(navigationString.PROFILE)}>
                            <Image style={styles.profileStyle} source={{ uri: item.userPicture ? item.userPicture : imagePath.avatar }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text numberOfLines={1} style={styles.profileNameStyle}>  {item.userName ? item.userName : "Anonymous User"}</Text>
                            <Text numberOfLines={1} style={styles.profileDescStyle}>  {item.userAddress ? item.userAddress : "Anonymous Address"} </Text>
                            <View />
                        </View>
                    </View>
                    <View >

                        <ThreeDotICon name="dots-horizontal" size={25} color={colors.blackColor} onPress={handlePress} />
                    </View>
                </View>

                <View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("DetailPost", { postData: item })}>
                        <Image style={styles.postImageStyle} source={{ uri: item.imageUrl }} />
                    </TouchableOpacity>
                    <Text style={styles.postTitleStyle}> {item.title} </Text>
                    <Text style={styles.postDescStyle} numberOfLines={2}> Index is: {index} {item.description} </Text>
                    <Text style={styles.postTimeStyle} > {formattedTime} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: moderateVerticalScale(20) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Like name="like2" size={28} color={colors.blackColor} />
                        <Text style={styles.likecommentStyle}>50</Text>
                        <View style={{ marginHorizontal: moderateScale(25) }} />
                        <Comment name="comment-o" size={28} color={colors.blackColor} />
                        <Text style={styles.likecommentStyle}>22</Text>
                    </View>
                    <Share name="share" size={24} color={colors.blackColor} />
                </View>

            </View >
        )
    }

    useEffect(() => {
        getMyPostsData();
    }, [isFocused])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.wlight} barStyle={'dark-content'} />
            <View style={styles.head}>
                <Text style={{ fontSize: scale(20), flex: 1, color: colors.socialorange, fontWeight: '600' }}>Social Links</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 0.5 }}>
                    <Icon name="diff-added" size={30} color={colors.blackColor} onPress={() => navigation.navigate(navigationString.CREATE_POST)} />
                    <MyIcon name="chatbox-ellipses" size={30} color={colors.blackColor} />
                </View>
            </View>
            <View style={styles.main}>
                <FlatList
                    data={postList}
                    // renderItem={renderItem}
                    renderItem={({ item, index }) => renderItem({ item, index, customModalHandler })}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={<View style={styles.bottomStyle} />}
                    showsVerticalScrollIndicator={false}
                />
                {selectedItem && (
                    <CustomModal
                        visible={showModal}
                        closeModal={() => setShowModal(false)}
                        postData={selectedItem}
                        userData={userData.uid}
                    />
                )}

            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.whiteColor
    },
    head: {
        flex: 0.2,
        backgroundColor: colors.wlight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateVerticalScale(12),
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.blackOpacity70,
        shadowColor: colors.blackColor,
        elevation: 20,
    },
    main: {
        flex: 3,
        backgroundColor: colors.wlight
    },
    post1: {
        backgroundColor: colors.whiteColorOpacity70,
        marginHorizontal: moderateScale(6),
        padding: moderateScale(10)
    },
    profileStyle: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(30),
        resizeMode: 'cover'
    },
    profileNameStyle: {
        fontSize: scale(16),
        color: colors.blackColor
    },
    profileDescStyle: {
        fontSize: scale(12),
        color: colors.blackOpacity70
    },
    postImageStyle: {
        width: '100%',
        height: height / 2,
        borderRadius: moderateScale(8),
        resizeMode: 'cover',
        marginVertical: moderateVerticalScale(14)
    },
    postTitleStyle: {
        fontSize: scale(15),
        color: colors.blackColor,
        fontWeight: '700'
    },
    postDescStyle: {
        fontSize: scale(12),
        color: colors.blackOpacity90,
        marginVertical: moderateVerticalScale(6)
        // fontWeight: '500'
    },
    postTimeStyle: {
        fontSize: scale(12),
        color: colors.grayColor,
        fontWeight: '500'
    },
    bottomStyle: {
        marginVertical: moderateVerticalScale(8),
        // borderBottomWidth: 0.7,
        // borderBottomColor: colors.blackColor
        height: moderateVerticalScale(6),
        backgroundColor: colors.gray7
    },
    likecommentStyle: {
        fontSize: scale(16),
        color: colors.grayColor,
        fontWeight: '500',
        marginLeft: moderateScale(10)
    },
    modalStyle: {
        backgroundColor: colors.wlight,
        height: height / 3,
        width: '60%', borderWidth: 1,
        borderColor: colors.blackOpacity15,
        shadowColor: colors.blackOpacity40,
        elevation: 10,
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(18),
        paddingVertical: moderateVerticalScale(12)
    }
})

export default Notification;