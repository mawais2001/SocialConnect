import React from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import navigationString from '../../Navigation/navigationString';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import strings from '../../constants/lang';
import ButtonCompo from '../../Components/ButtonCompo';
import { moderateScale, moderateScaleVertical } from '../../styles/responsiveSize';

function IntialScreen({ navigation }) {
    const handleTermsPolicy = (type = 1) => {
        if (type == 1) {
            Alert.alert("Terms")
        } else {
            Alert.alert("Privacy Policy")
        }
    }
    return (
        <WrapperContainer>
            <View style={styles.container}>
                <View style={{ flex: 0.3, justifyContent: 'center' }}>
                    <Image source={imagePath.logo} style={styles.logo} />
                </View>

                <View style={{ flex: 0.6, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ ...styles.text, marginVertical: moderateScaleVertical(16) }}> {strings.BY_CLICKING_LOGIN}
                        <Text style={{ fontFamily: fontFamily.bold }} onPress={() => handleTermsPolicy(1)}> {strings.TERMS} </Text>
                        <Text> {strings.LEARN_HOW_WE_PROCESS} </Text>
                        <Text style={{ fontFamily: fontFamily.bold }} onPress={() => handleTermsPolicy(2)}> {strings.PIVACY_POLICY} </Text>
                    </Text>
                    <ButtonCompo title={strings.LOGIN_WITH_PHONE_NUMBER} onPress={() => navigation.navigate(navigationString.LOGIN)} />
                    <Text style={{ ...styles.text, marginVertical: moderateScaleVertical(16) }}> {strings.OR} </Text>

                    <ButtonCompo title={strings.LOGIN_WITH_GOOGLE}
                        style={{ backgroundColor: colors.whiteColor }}
                        textStyle={{ color: colors.blackColor }}
                        leftImg={imagePath.icGoogle}
                    />

                    <ButtonCompo title={strings.LOGIN_WITH_FACEBOOK} style={{ backgroundColor: colors.whiteColor, marginVertical: moderateScaleVertical(16) }} textStyle={{ color: colors.blackColor }}
                        leftImg={imagePath.icFacebook}
                    />
                    <ButtonCompo title={strings.LOGIN_WITH_APPLE} style={{ backgroundColor: colors.whiteColor }} textStyle={{ color: colors.blackColor }}
                        leftImg={imagePath.icApple}
                    />
                    <Text style={{ ...styles.text, marginVertical: moderateScaleVertical(16) }}>{strings.NEW_HERE} <Text onPress={() => navigation.navigate(navigationString.SIGNUP)} style={{ ...styles.text, fontFamily: fontFamily.bold, color: colors.blueColor }}>{strings.SIGN_UP}</Text> </Text>
                </View>
            </View>
        </WrapperContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(20),
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: moderateScale(130),
        height: moderateScale(130),
        borderRadius: moderateScale(130 / 2)
    },
    text: {
        color: colors.whiteColor,
        fontFamily: fontFamily.medium,
        textAlign: 'center'
    }
})

export default IntialScreen;