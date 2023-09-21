import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import WrapperContainer from '../../Components/WrapperContainer';
import TextInputCompo from '../../Components/TextInputCompo';
import { moderateScale, moderateScaleVertical, textScale } from '../../styles/responsiveSize';
import strings from '../../constants/lang';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import ButtonCompo from '../../Components/ButtonCompo';
import HeaderCompo from '../../Components/HeaderCompo';

function Signup(props) {
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    return (
        <WrapperContainer>
            <View style={styles.container}>
                <HeaderCompo />
                <View style={{ flex: 0.6 }}>
                    <Text style={styles.headingStyle}> {strings.CREATE_NEW_ACCOUNT} </Text>
                    <Text style={styles.desStyle}> {strings.CREATE_AN_ACCOUNT_SO_YOU_CAN_CONTINUE} </Text>

                    <TextInputCompo placeholder={strings.USERNAME} value={userName}
                        onChangeText={(text) => setUserName(text)}
                    />

                    <TextInputCompo placeholder={strings.FULL_NAME} value={fullName}
                        onChangeText={(text) => setFullName(text)}
                    />

                    <TextInputCompo placeholder={strings.EMAIL} value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInputCompo placeholder={strings.PASSWORD}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={secureTextEntry}
                        onPressSecure={() => setSecureTextEntry(!secureTextEntry)}
                        secureText={secureTextEntry ? 'Show' : 'Hide'}
                    />
                    <TextInputCompo placeholder={strings.CONFIRM_PASSWORD}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={secureTextEntry}
                        onPressSecure={() => setSecureTextEntry(!secureTextEntry)}
                        secureText={secureTextEntry ? 'Show' : 'Hide'}
                    />

                </View>

                <View style={{ flex: 0.3, justifyContent: 'flex-end' }}>
                    <ButtonCompo title={strings.SIGN_UP} style={{ alignSelf: 'center', width: '100%', }} />
                </View>
            </View>
        </WrapperContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScaleVertical(16)
    },
    headingStyle: {
        fontSize: textScale(24),
        color: colors.whiteColor,
        fontFamily: fontFamily.medium
    },
    desStyle: {
        fontSize: textScale(16),
        color: colors.whiteColorOpacity70,
        fontFamily: fontFamily.regular,
        marginTop: moderateScaleVertical(12),
        marginBottom: moderateScaleVertical(33)
    }
})

export default Signup;