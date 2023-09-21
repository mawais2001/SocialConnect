import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import HeaderCompo from '../../src/Components/HeaderCompo';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import colors from '../../src/styles/colors';
import imagePath from '../../src/constants/imagePath';
import Icon from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

function ImageWorkout(props) {
    let d = new Date().toLocaleTimeString(); // for now
    // let hour = d.getHours(); // => 9
    // let min = d.getMinutes();
    return (
        <View style={styles.container}>
            <HeaderCompo style={{ paddingHorizontal: moderateScale(24), paddingTop: moderateVerticalScale(10) }} />
            <View style={{ alignItems: 'center', marginVertical: moderateVerticalScale(24) }}>
                <Image style={styles.image} source={imagePath.gymbg} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: moderateVerticalScale(12) }}>
                <Icon name="refresh" size={20} color={colors.wlight} />
                <Icon2 name="backward" size={20} color={colors.wlight} />
                <View style={styles.mybox}>
                    <Icon2 name="pause" size={20} color={colors.wlight} />
                </View>
                <Icon2 name="forward" size={20} color={colors.wlight} />
                <Icon2 name="stop" size={20} color={colors.wlight} />
            </View>

            <View style={{ alignItems: 'center', marginVertical: moderateVerticalScale(30) }}>
                <Text style={{ color: colors.wlight, fontSize: scale(16) }}> {d} </Text>
                <Text style={{ color: colors.wgray, fontSize: scale(14), fontWeight: 'bold' }}> 13x raises </Text>
            </View>
            <View style={styles.lastBox}>
                <Text style={{ color: colors.wgray, fontSize: scale(14), fontWeight: 'bold' }}>Next Workout</Text>
                <Text style={{ color: colors.wlight, fontSize: scale(16), marginTop: moderateVerticalScale(10) }}> Overhead presses </Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.wdarkblack
    },
    image: {
        width: moderateScale(340),
        height: moderateScale(250),
        borderRadius: moderateScale(16)
    },
    mybox: {
        backgroundColor: colors.worange,
        shadowColor: colors.wblackopactiylow,
        elevation: 20,
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    lastBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.wlightblack,
        flex: 1,
        borderTopLeftRadius: moderateScale(200),
        borderTopRightRadius: moderateScale(200)
    }
})

export default ImageWorkout;