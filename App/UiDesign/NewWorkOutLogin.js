import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../../src/styles/colors';
import HeaderCompo from '../../src/Components/HeaderCompo';
import { moderateScale, moderateVerticalScale, s, scale } from 'react-native-size-matters';
import InputWork from './InputWork';
import ButtonCompo from '../../src/Components/ButtonCompo';
import imagePath from '../../src/constants/imagePath';


function NewWorkOutLogin(props) {
    const [isVisible, setIsIVisible] = useState(true);
    return (
        <View style={styles.container}>
            <HeaderCompo style={{ paddingHorizontal: moderateScale(22), paddingTop: moderateVerticalScale(32) }} />
            <View style={styles.box1}>
                <View style={{ alignItems: 'center', marginVertical: moderateVerticalScale(40) }}>
                    <Text style={styles.heading}>Hi Nice to meet you again, Mike</Text>
                </View>
                <View style={{ paddingHorizontal: moderateScale(20) }}>
                    <InputWork label="Username" placeholder="Enter username" />
                    <InputWork label="Password" placeholder="Enter password" secureTextEntry={isVisible}
                        onPressSecure={() => setIsIVisible(!isVisible)}
                        secureText={isVisible ? 'Show' : 'Hide'}

                    />
                </View>
                <View style={{ alignItems: 'center', marginTop: moderateVerticalScale(10) }}>
                    <ButtonCompo title='Sign Up' style={{ backgroundColor: colors.worange }} />
                    <Text style={{ marginVertical: moderateVerticalScale(10), color: colors.wlight, fontSize: scale(14) }}>or</Text>
                    <ButtonCompo title='Login with Google' style={{ backgroundColor: colors.wlight }} textStyle={{ color: colors.wdarkblack }}
                        leftImg={imagePath.icGoogle}
                    />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.wdarkblack
    },
    box1: {
        flex: 1,
        backgroundColor: colors.wlightblack,
        marginTop: moderateVerticalScale(22),
        borderTopLeftRadius: moderateScale(40),
        borderTopRightRadius: moderateScale(40)
    },
    heading: {
        fontSize: scale(28),
        color: colors.wwhite,
        textAlign: 'justify',
        marginHorizontal: moderateScale(20)
    }
})

export default NewWorkOutLogin;