import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import HeaderWorkOut from './HeaderWorkOut';
import colors from '../../src/styles/colors';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import imagePath from '../../src/constants/imagePath';
import ButtonCompo from '../../src/Components/ButtonCompo';
import Icon from 'react-native-vector-icons/FontAwesome5';
function WorkOut(props) {
    const [select, setSelect] = useState(0);
    return (
        <View style={styles.container}>
            <HeaderWorkOut color='black' />
            <View style={styles.box1}>
                <View style={{ paddingLeft: moderateScale(25) }}>
                    <Text style={{ fontSize: moderateScale(20), color: colors.blackColor, fontWeight: 'bold' }}>Hello</Text>
                    <Text style={{ fontSize: moderateScale(20), color: colors.wblue, fontWeight: 'bold' }}>Amara</Text>
                </View>

                <View style={{ paddingHorizontal: moderateScale(10), marginTop: moderateVerticalScale(20) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <TouchableOpacity style={select === 1 ? styles.selected : null} onPress={() => setSelect(1)}>
                            <Text style={select === 1 ? styles.subtitle2 : styles.subtitle}>Mon</Text>
                            <Text style={select === 1 ? styles.txtCalendar2 : styles.txtCalendar}>1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={select === 2 ? styles.selected : null} onPress={() => setSelect(2)}>
                            <Text style={select === 2 ? styles.subtitle2 : styles.subtitle}>Tues</Text>
                            <Text style={select === 2 ? styles.txtCalendar2 : styles.txtCalendar}>2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={select === 3 ? styles.selected : null} onPress={() => setSelect(3)}>
                            <Text style={select === 3 ? styles.subtitle2 : styles.subtitle}>Wed</Text>
                            <Text style={select === 3 ? styles.txtCalendar2 : styles.txtCalendar}>3</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={select === 4 ? styles.selected : null} onPress={() => setSelect(4)}>
                            <Text style={select === 4 ? styles.subtitle2 : styles.subtitle}>Thru</Text>
                            <Text style={select === 4 ? styles.txtCalendar2 : styles.txtCalendar}>4</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={select === 5 ? styles.selected : null} onPress={() => setSelect(5)}>
                            <Text style={select === 5 ? styles.subtitle2 : styles.subtitle}>Fri</Text>
                            <Text style={select === 5 ? styles.txtCalendar2 : styles.txtCalendar}>5</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={select === 6 ? styles.selected : null} onPress={() => setSelect(6)}>
                            <Text style={select === 6 ? styles.subtitle2 : styles.subtitle}>Sat</Text>
                            <Text style={select === 6 ? styles.txtCalendar2 : styles.txtCalendar}>6</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={select === 7 ? styles.selected : null} onPress={() => setSelect(7)}>
                            <Text style={select === 7 ? styles.subtitle2 : styles.subtitle}>Sun</Text>
                            <Text style={select === 7 ? styles.txtCalendar2 : styles.txtCalendar}>7</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: moderateScale(10), marginTop: moderateVerticalScale(26) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image style={styles.img} source={imagePath.run} />
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.txt1}>Today you run for</Text>
                                <Text style={styles.txt2}>5.31 Km</Text>
                                <ButtonCompo title='Detail' style={{ width: '50%', backgroundColor: colors.wpink, borderRadius: moderateScale(22) }}
                                    onPress={() => props.navigation.navigate("FavWorkout")}
                                />
                            </View>
                        </View>
                    </View>
                </View>

            </View>
            <View style={styles.box2}>
                <View style={{ paddingHorizontal: moderateScale(20) }}>
                    <View style={{ backgroundColor: colors.wblue, flexDirection: 'row', justifyContent: 'space-between', padding: moderateScale(20), borderRadius: moderateScale(22) }}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: 'white', paddingBottom: moderateVerticalScale(2) }}>
                                <Icon name="running" size={25} color={colors.wwhite} />
                                <Text style={styles.box2txt}>3628</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: moderateVerticalScale(12), borderBottomWidth: 0.5, borderBottomColor: 'white', paddingBottom: moderateVerticalScale(2) }}>
                                <Icon name="heart" size={25} color={colors.wwhite} />
                                <Text style={styles.box2txt}>98</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Icon name="fire" size={25} color={colors.wwhite} />
                                <Text style={styles.box2txt}>460</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: scale(14), color: colors.whiteColor }}>Live tracking</Text>
                            <Image style={styles.trackImage} source={imagePath.run} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.wwhite
        // backgroundColor: 'lightcoral'
    },
    box1: {
        backgroundColor: colors.wwhite,
        flex: 1.5
    },
    box2: {
        // backgroundColor: 'seagreen',
        flex: 1.3
    },
    txtCalendar: {
        color: 'black',
        fontSize: scale(20),
        fontWeight: '700'
    },
    img: {
        width: 120,
        height: 120,
        tintColor: colors.wblue
    },
    txt1: {
        color: 'black',
        fontSize: scale(16),
        fontWeight: '700',
        textAlign: 'center'
    },
    txt2: {
        color: colors.wblue,
        fontSize: scale(22),
        fontWeight: 'bold',
        marginVertical: moderateVerticalScale(10)
    },
    box2txt: {
        color: colors.wwhite,
        fontSize: scale(22),
        fontWeight: 'bold',
        marginHorizontal: scale(20)
    },
    selected: {
        backgroundColor: colors.wblue,
        paddingHorizontal: moderateScale(6),
        paddingVertical: moderateVerticalScale(10),
        borderRadius: moderateScale(12)
    },
    txtCalendar2: {
        color: colors.whiteColor,
        fontSize: scale(20),
        fontWeight: '700'
    },
    subtitle: {
        color: colors.blackColor
    },
    subtitle2: {
        color: colors.whiteColor,
        fontWeight: 'bold'
    },
    trackImage: {
        width: moderateScale(120),
        height: moderateScale(120)
    }
})

export default WorkOut;