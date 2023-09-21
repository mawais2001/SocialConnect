import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import colors from '../../src/styles/colors';
import { moderateScale, scale } from 'react-native-size-matters';

function InputWork({
    label,
    labelStyle,
    placeholder,
    inputStyle,
    style,
    value,
    onPressSecure = () => { },
    onChangeText,
    secureTextEntry = false,
    secureText = '',
    inputBox,
    placeholderTextColor = colors.wlight,
    ...props

}) {
    return (
        <View style={{ ...styles.style, ...style }}>
            <Text style={{ ...styles.labelStyle, ...labelStyle }}>{label}</Text>
            <View style={{ ...styles.inputBox, ...inputBox }}>
                <TextInput placeholderTextColor={colors.wlight}
                    style={styles.inputStyle}
                    placeholder={placeholder}
                    onPressSecure={onPressSecure}
                    value={value} onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    {...props} />
                {secureText ? <Text style={styles.text} onPress={onPressSecure}> {secureText} </Text> : null}
                {/* <Text style={styles.text}>Hide</Text> */}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    style: {
        backgroundColor: colors.wlightblack,
        // paddingHorizontal: 20,
        paddingVertical: 10
    },
    labelStyle: {
        color: colors.wlight,
        fontSize: scale(12),
        marginBottom: moderateScale(10)
    },
    inputBox: {
        backgroundColor: colors.winput,
        borderRadius: moderateScale(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(6)
    },
    inputStyle: {
        fontSize: scale(13),
        color: colors.wlight,
        flex: 1,
        // backgroundColor: 'red'
    },
    text: {
        paddingHorizontal: moderateScale(10), alignSelf: 'center',
        color: colors.wlight
    }
})

export default InputWork;