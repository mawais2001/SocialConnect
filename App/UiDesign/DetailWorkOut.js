import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import HeaderWorkOut from './HeaderWorkOut';
import colors from '../../src/styles/colors';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import imagePath from '../../src/constants/imagePath';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ButtonCompo from '../../src/Components/ButtonCompo';
function DetailWorkOut(props) {
    const [select, setSelect] = useState(0);
    return (
        <View style={styles.container}>
            <HeaderWorkOut />
            <View style={styles.box1}>
                <View style={{ alignItems: 'center', paddingBottom: moderateVerticalScale(14) }}>
                    <Text style={{ fontSize: scale(16), color: colors.whiteColor, fontWeight: 'bold' }}>Current Progress</Text>
                </View>
                <View style={styles.box1Container}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Icon name="chevron-back" size={40} color={colors.wwhite} />
                    </TouchableOpacity>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={imagePath.progress} />
                    </View>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Icon name="chevron-forward" size={40} color={colors.wwhite} />
                    </TouchableOpacity>
                </View>
                {/* <View>
                    <Image source={imagePath.progress} />
                    <Text>jsdf</Text>
                </View> */}
            </View>
            <View style={styles.box2}>
                <View style={{ alignItems: 'center', paddingVertical: moderateVerticalScale(20) }}>
                    <ButtonCompo title='Workout Type' style={{ backgroundColor: colors.wpink, width: '60%', borderRadius: moderateScale(20) }} onPress={() => props.navigation.navigate("NewWorkOutLogin")} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: moderateVerticalScale(12) }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={select === 1 ? styles.smbox2 : styles.smbox1} onPress={() => setSelect(1)}>
                            <FontAwesome5 name="heartbeat" size={30} color={select === 1 ? colors.wwhite : colors.grayColor} />
                        </TouchableOpacity>
                        <Text style={[{ color: select === 1 ? colors.blackColor : colors.grayColor }, { fontWeight: 'bold' }]}>Cardio</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={select === 2 ? styles.smbox2 : styles.smbox1} onPress={() => setSelect(2)}>
                            <FontAwesome6 name="dumbbell" size={30} color={select === 2 ? colors.wwhite : colors.grayColor} />
                        </TouchableOpacity>
                        <Text style={[{ color: select === 2 ? colors.blackColor : colors.grayColor }, { fontWeight: 'bold' }]}>Power</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={select === 3 ? styles.smbox2 : styles.smbox1} onPress={() => setSelect(3)}>
                            <FontAwesome5 name="walking" size={30} color={select === 3 ? colors.wwhite : colors.grayColor} />
                        </TouchableOpacity>
                        <Text style={[{ color: select === 3 ? colors.blackColor : colors.grayColor }, { fontWeight: 'bold' }]}>Endurance</Text>
                    </View>


                </View>


                <View style={{ paddingHorizontal: moderateScale(20) }}>
                    <View style={{ backgroundColor: colors.wblue, flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: moderateScale(30), paddingVertical: moderateVerticalScale(30), borderRadius: moderateScale(18) }}>
                        <View>
                            <Icon name="square" size={30} color={colors.wwhite} />
                            <Text style={{ fontSize: scale(16), color: colors.wwhite, fontWeight: 'bold' }}>Mon</Text>
                        </View>
                        <View>
                            <Icon name="square" size={30} color={colors.wwhite} />
                            <Text style={{ fontSize: scale(16), color: colors.wwhite, fontWeight: 'bold' }}>Tue</Text>
                        </View>
                        <View>
                            <Icon name="square" size={30} color={colors.wwhite} />
                            <Text style={{ fontSize: scale(16), color: colors.wwhite, fontWeight: 'bold' }}>Wed</Text>
                        </View>
                        <View>
                            <Icon name="square" size={30} color={colors.wwhite} />
                            <Text style={{ fontSize: scale(16), color: colors.wwhite, fontWeight: 'bold' }}>Thu</Text>
                        </View>
                        <View>
                            <Icon name="square" size={30} color={colors.wwhite} />
                            <Text style={{ fontSize: scale(16), color: colors.wwhite, fontWeight: 'bold' }}>Fri</Text>
                        </View>
                        <View>
                            <Icon name="square" size={30} color={colors.wwhite} />
                            <Text style={{ fontSize: scale(16), color: colors.wwhite, fontWeight: 'bold' }}>Sat</Text>
                        </View>
                        <View>
                            <Icon name="square" size={30} color={colors.wwhite} />
                            <Text style={{ fontSize: scale(16), color: colors.wwhite, fontWeight: 'bold' }}>Sun</Text>
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginTop: moderateVerticalScale(10) }}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.myplusBtn} onPress={() => props.navigation.navigate("ImageWorkout")}>
                        <FontAwesome6 name="plus" size={22} color={colors.wwhite} />
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.wblue
    },
    box1: {
        flex: 1,
        // backgroundColor: 'pink'
    },
    box2: {
        flex: 1.7,
        backgroundColor: colors.wwhite,
        borderTopRightRadius: moderateScale(30),
        borderTopLeftRadius: moderateScale(30),
        shadowColor: colors.blackColor
    },
    img: {
        width: moderateScale(120),
        height: moderateScale(120),
    },
    imgContainer: {
        backgroundColor: colors.whiteColorOpacity70,
        width: moderateScale(140),
        height: moderateScale(140),
        borderRadius: moderateScale(140 / 2),
        alignItems: 'center',
        justifyContent: 'center'
        // padding: moderateScale(12)
        // borderWidth: 16
    },
    box1Container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: moderateVerticalScale(10)
    },
    smbox1: {
        backgroundColor: colors.blackOpacity10,
        width: moderateScale(70),
        height: moderateVerticalScale(70),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(12)
    },
    smbox2: {
        backgroundColor: colors.wpink,
        width: moderateScale(70),
        height: moderateVerticalScale(70),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(12)
    },
    myplusBtn: {
        backgroundColor: colors.wpink,
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default DetailWorkOut;