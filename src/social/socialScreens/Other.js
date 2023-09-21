import React from 'react';
import { View, StyleSheet, Text, StatusBar, FlatList, Image } from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Octicons';
import MyIcon from 'react-native-vector-icons/Ionicons';
import Like from 'react-native-vector-icons/AntDesign';
import Comment from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-vector-icons/Entypo';
import colors from '../../styles/colors';
import dummyData from '../static/dummyData';
import ThreeDotICon from 'react-native-vector-icons/MaterialCommunityIcons';
import { height } from '../../styles/responsiveSize';
function Other(props) {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.post1}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <Image style={styles.profileStyle} source={{ uri: item.profilePicture }} />
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text numberOfLines={1} style={styles.profileNameStyle}>  {item.profileName} </Text>
                            <Text numberOfLines={1} style={styles.profileDescStyle}>  {item.profileAddress} </Text>
                            <View />
                        </View>
                    </View>
                    <View >
                        <ThreeDotICon name="dots-horizontal" size={25} color={colors.blackColor} />
                    </View>
                </View>

                <View>
                    <Image style={styles.postImageStyle} source={{ uri: item.postImage }} />
                    <Text style={styles.postTitleStyle}> {item.postTitle} </Text>
                    <Text style={styles.postDescStyle} numberOfLines={2}> {item.postDescription} </Text>
                    <Text style={styles.postTimeStyle} > {item.postTime} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: moderateVerticalScale(20) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Like name="like2" size={28} color={colors.blackColor} />
                        <View style={{ marginHorizontal: moderateScale(25) }} />
                        <Comment name="comment-o" size={28} color={colors.blackColor} />

                    </View>
                    <Share name="share" size={28} color={colors.blackColor} />
                </View>

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.wlight} barStyle={'dark-content'} />
            <View style={styles.head}>
                <Text style={{ fontSize: scale(20), flex: 1, color: colors.socialorange, fontWeight: '600' }}>Social Links</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 0.5 }}>
                    <Icon name="diff-added" size={30} color={colors.blackColor} />
                    <MyIcon name="chatbox-ellipses" size={30} color={colors.blackColor} />
                </View>
            </View>
            <View style={styles.main}>
                <FlatList
                    data={dummyData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={<View style={styles.bottomStyle} />}
                />
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
    }
})

export default Other;