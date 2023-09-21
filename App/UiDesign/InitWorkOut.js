import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../../src/styles/colors';
import HeaderWorkOut from './HeaderWorkOut';
import imagePath from '../../src/constants/imagePath';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import ButtonCompo from '../../src/Components/ButtonCompo';

function InitWorkOut(props) {
    return (
        <View style={styles.container}>
            {/* <HeaderWorkOut /> */}
            <View style={styles.main}>
                <View />
                <View style={{ alignItems: 'center' }}>
                    <Image style={styles.logo} source={imagePath.gym} />
                    <Text style={styles.txtlogo}>FIRE FIT</Text>
                    <Text style={styles.txtsublogo}>Stay in Shape, Stay in healthy</Text>
                </View>
                <View />
                <View style={{ alignItems: 'center' }}>
                    <ButtonCompo title='Sign Up' style={{ width: '40%', backgroundColor: colors.wpink, marginBottom: moderateVerticalScale(10), borderRadius: moderateScale(16) }}
                        onPress={() => props.navigation.navigate("WorkOut")}
                    />
                    <ButtonCompo title='Login'
                        style={{ width: '40%', backgroundColor: colors.wwhite, marginBottom: moderateVerticalScale(10), borderRadius: moderateScale(16) }}
                        textStyle={{ color: colors.wpink }}
                        onPress={() => props.navigation.navigate("DetailWorkOut")}
                    />

                    <TouchableOpacity activeOpacity={0.6}>
                        <Text style={styles.txtsublogo}>Forgot Your Password?</Text>
                    </TouchableOpacity>
                </View>
                <View />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.wblue
    },
    main: {
        flex: 1,
        // backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    logo: {
        width: moderateScale(120),
        height: moderateScale(120),
        borderRadius: moderateScale(120 / 2),
        tintColor: colors.blackColor
    },
    txtlogo: {
        color: colors.wwhite,
        fontSize: scale(20)
    },
    txtsublogo: {
        color: colors.wwhite,
        fontSize: scale(14)
    }
})

export default InitWorkOut;