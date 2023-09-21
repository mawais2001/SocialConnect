import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { scale, ScaledSheet, moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import colors from '../../src/styles/colors';
import HeaderCompo from '../../src/Components/HeaderCompo';
import imagePath from '../../src/constants/imagePath';
import ButtonCompo from '../../src/Components/ButtonCompo';

function FavWorkout(props) {
    const [select, setSelect] = useState(0)
    return (
        <View style={styles.container}>
            <HeaderCompo style={{ paddingHorizontal: moderateScale(20) }} />
            <View style={{ backgroundColor: colors.wdarkblack, flex: 0.1 }}>

            </View>

            <View style={styles.box2}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>What's Your Current Weight</Text>
                </View>
                <View style={styles.mycontainer}>
                    <TouchableOpacity activeOpacity={0.4} style={select === 1 ? styles.mybox1 : styles.mybox2} onPress={() => setSelect(1)}>
                        <Text style={select === 1 ? styles.text2 : styles.text1}>kg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.4} style={select === 2 ? styles.mybox1 : styles.mybox2} onPress={() => setSelect(2)}>
                        <Text style={select === 2 ? styles.text2 : styles.text1}> lb </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.box3}>
                    <Text style={{ fontSize: scale(24), color: colors.worange, fontWeight: 'bold' }}>68.8 <Text style={{ fontSize: scale(18), color: colors.wlight }}>kg</Text> </Text>
                    <Image style={styles.img} source={imagePath.ruller} />
                </View>

                <View style={styles.box4}>
                    <View style={styles.box5}>
                        <Text style={{ color: colors.wlight, fontSize: scale(16), fontWeight: 'bold' }}>Current BMI</Text>
                        <Text style={{ color: colors.wwblue, fontSize: scale(22), fontWeight: 'bold' }}>21.1</Text>
                    </View>
                    <View style={styles.box6}>
                        <Text style={{ color: colors.wlight, fontSize: scale(16) }}>You getting a greate figure! keep it to fit</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: moderateVerticalScale(20), flex: 1, justifyContent: 'center' }}>
                    <ButtonCompo title='Next' style={{ backgroundColor: colors.worange }} />
                </View>
            </View>


        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.wdarkblack
    },
    box2: {
        backgroundColor: colors.wlightblack,
        flex: 2,
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30)
    },
    headingContainer: {
        alignItems: 'center',
        marginTop: moderateVerticalScale(10)
    },
    heading: {
        fontSize: scale(30),
        color: colors.wlight,
        textAlign: 'center'
    },
    mycontainer: {
        flexDirection: 'row', justifyContent: 'center',
        marginTop: moderateVerticalScale(20),
    },
    text1: {
        fontSize: scale(12),
        color: colors.wlight,
        fontWeight: 'bold'
    },
    text2: {
        fontSize: scale(14),
        color: colors.wdarkblack,
        fontWeight: 'bold'
    },
    mybox1: {
        backgroundColor: colors.wwblue,
        paddingVertical: moderateVerticalScale(10),
        paddingHorizontal: moderateScale(18),
        borderRadius: moderateScale(16)
    },
    mybox2: {
        backgroundColor: colors.blackOpacity20,
        paddingVertical: moderateVerticalScale(10),
        paddingHorizontal: moderateScale(18),
        borderRadius: moderateScale(16)
    },
    box3: {
        // backgroundColor: 'red',
        paddingTop: moderateVerticalScale(40),
        paddingBottom: moderateVerticalScale(20),
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 0.3
    },
    img: {
        height: moderateVerticalScale(20),
        width: '100%',
        tintColor: colors.wlight
    },
    box4: {
        // backgroundColor: 'beige',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: moderateScale(40),
        flex: 0.5
        // alignItems: 'center'
    },
    box5: {
        backgroundColor: colors.wblackopactiylow,
        width: '40%',
        borderTopLeftRadius: moderateScale(12),
        borderBottomLeftRadius: moderateScale(12),
        paddingHorizontal: moderateScale(18),
        paddingVertical: moderateVerticalScale(10)
        // alignItems: 'center'
    },
    box6: {
        backgroundColor: colors.wdarkblack,
        borderTopRightRadius: moderateScale(12),
        borderBottomRightRadius: moderateScale(12),
        width: '60%',
        paddingHorizontal: moderateScale(18),
        paddingVertical: moderateVerticalScale(10)
        // alignItems: 'center',
        // flexWrap: 'wrap'
    }
})

export default FavWorkout;